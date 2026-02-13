import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { gallery } from "@/drizzle/schema";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as File;

    if (!title || !file) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Convert File → Buffer → Base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64File = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(base64File, {
      folder: "gallery",                 // Cloudinary folder
      resource_type: "auto",              // image | pdf | video
    });

    // Store URL in DB
    await db.insert(gallery).values({
      title,
      description,
      imagePath: uploadResult.secure_url, // Cloudinary URL
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await db.select().from(gallery);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Gallery Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
