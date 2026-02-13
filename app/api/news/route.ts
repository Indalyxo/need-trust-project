import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { news } from "@/drizzle/schema";
import { desc } from "drizzle-orm";
import { uploadToCloudinary } from "@/lib/cloudinary";

/* ---------------------------- GET ---------------------------- */

export async function GET() {
  try {
    const newsArticles = await db
      .select()
      .from(news)
      .orderBy(desc(news.createdAt));

    return NextResponse.json({ success: true, data: newsArticles });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

/* ---------------------------- POST ---------------------------- */

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string | null;
    const content = formData.get("content") as string | null;
    const file = formData.get("image") as File | null;

    if (!title || !content || !file) {
      return NextResponse.json(
        { error: "Title, content, and image are required" },
        { status: 400 }
      );
    }

    // Validate image type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Size limit (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Image size must be under 5MB" },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const uploadUrl = await uploadToCloudinary(file, "news");

    // Save to DB
    const [newNews] = await db
      .insert(news)
      .values({
        title,
        content,
        imageUrl: uploadUrl,
      })
      .returning();

    return NextResponse.json(
      { success: true, data: newNews },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create news" },
      { status: 500 }
    );
  }
}
