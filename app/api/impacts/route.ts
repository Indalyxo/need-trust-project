import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { impacts } from "@/drizzle/schema";
import cloudinary from "@/lib/cloudinary";

/* ------------------------------ GET ------------------------------ */

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

/* ------------------------------ POST ------------------------------ */

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const statsValue = formData.get("statsValue") as string;
    const statsLabel = formData.get("statsLabel") as string;
    const file = formData.get("image") as File | null;

    if (!title || !description || !icon || !statsValue || !statsLabel || !file) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Accept only images
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, message: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Convert File → Base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const upload = await cloudinary.uploader.upload(base64Image, {
      folder: "impacts",
      resource_type: "image",
    });

    // Save Cloudinary URL in DB
    const result = await db
      .insert(impacts)
      .values({
        title,
        description,
        imagePath: upload.secure_url,
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
