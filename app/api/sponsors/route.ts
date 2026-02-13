import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sponsors } from "@/drizzle/schema";
import { desc } from "drizzle-orm";
import { uploadToCloudinary } from "@/lib/cloudinary";

/* ----------------------------- GET ----------------------------- */

export async function GET() {
  try {
    const allSponsors = await db
      .select()
      .from(sponsors)
      .orderBy(desc(sponsors.createdAt));

    return NextResponse.json({ success: true, data: allSponsors });
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch sponsors" },
      { status: 500 }
    );
  }
}

/* ----------------------------- POST ----------------------------- */

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string | null;
    const link = formData.get("link") as string | null;
    const file = formData.get("image") as File | null;

    if (!name || !link || !file) {
      return NextResponse.json(
        { error: "Name, link, and image are required" },
        { status: 400 }
      );
    }

    // Validate image
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
        { error: "Image must be under 5MB" },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const uploadUrl = await uploadToCloudinary(file, "sponsors");

    // Save to DB
    const [newSponsor] = await db
      .insert(sponsors)
      .values({
        imageUrl: uploadUrl,
        name,
        link,
      })
      .returning();

    return NextResponse.json(
      { success: true, data: newSponsor },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating sponsor:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create sponsor" },
      { status: 500 }
    );
  }
}
