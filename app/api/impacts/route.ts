import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { impacts } from "@/drizzle/schema";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const allImpacts = await db.select().from(impacts).orderBy(impacts.id);
    return NextResponse.json({
      success: true,
      data: allImpacts,
    });
  } catch (error) {
    console.error("Error fetching impacts:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch impacts" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const statsValue = formData.get("statsValue") as string;
    const statsLabel = formData.get("statsLabel") as string;
    const file = formData.get("image") as File;

    if (!title || !description || !icon || !statsValue || !statsLabel || !file) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save file to public/uploads/impacts
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(
      process.cwd(),
      "public/uploads/impacts",
      filename
    );

    await writeFile(filepath, buffer);

    const imagePath = `/uploads/impacts/${filename}`;

    const result = await db
      .insert(impacts)
      .values({
        title,
        description,
        imagePath,
        icon,
        statsValue,
        statsLabel,
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error("Error creating impact:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create impact" },
      { status: 500 }
    );
  }
}
