import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { impacts } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import cloudinary from "@/lib/cloudinary";

/* --------------------------- DELETE --------------------------- */

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: "Invalid impact ID" }, { status: 400 });
  }

  try {
    const [impact] = await db
      .select()
      .from(impacts)
      .where(eq(impacts.id, numericId));

    if (!impact) {
      return NextResponse.json(
        { success: false, message: "Impact not found" },
        { status: 404 }
      );
    }

    // 🔥 Delete image from Cloudinary
    if (impact.imagePath) {
      const publicId = extractCloudinaryPublicId(impact.imagePath);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId, {
          resource_type: "image",
        });
      }
    }

    await db.delete(impacts).where(eq(impacts.id, numericId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting impact:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete impact" },
      { status: 500 }
    );
  }
}

/* --------------------------- PATCH --------------------------- */

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: "Invalid impact ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { title, description } = body;

    const [existing] = await db
      .select()
      .from(impacts)
      .where(eq(impacts.id, numericId));

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Impact not found" },
        { status: 404 }
      );
    }

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;

    const result = await db
      .update(impacts)
      .set(updateData)
      .where(eq(impacts.id, numericId))
      .returning();

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error("Error updating impact:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update impact" },
      { status: 500 }
    );
  }
}

/* ---------------------- Helper ---------------------- */

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
