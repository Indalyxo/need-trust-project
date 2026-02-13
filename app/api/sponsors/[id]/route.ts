import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sponsors } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const sponsorId = Number(id);

    if (isNaN(sponsorId)) {
      return NextResponse.json(
        { error: "Invalid sponsor ID" },
        { status: 400 }
      );
    }

    // 🔍 Fetch sponsor first
    const [sponsor] = await db
      .select()
      .from(sponsors)
      .where(eq(sponsors.id, sponsorId));

    if (!sponsor) {
      return NextResponse.json(
        { error: "Sponsor not found" },
        { status: 404 }
      );
    }

    // 🔥 Delete image from Cloudinary
    if (sponsor.imageUrl) {
      const publicId = extractCloudinaryPublicId(sponsor.imageUrl);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId, {
          resource_type: "image",
        });
      }
    }

    // 🗑️ Delete DB row
    await db.delete(sponsors).where(eq(sponsors.id, sponsorId));

    return NextResponse.json({
      success: true,
      message: "Sponsor deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting sponsor:", error);
    return NextResponse.json(
      { error: "Failed to delete sponsor" },
      { status: 500 }
    );
  }
}

/* ------------------------ Helper ------------------------ */

function extractCloudinaryPublicId(url: string): string | null {
  try {
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;

    return parts[1]
      .replace(/^v\d+\//, "")
      .replace(/\.[^/.]+$/, "");
  } catch {
    return null;
  }
}
