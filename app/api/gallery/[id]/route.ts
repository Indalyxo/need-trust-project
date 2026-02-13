import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { gallery } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";

/* ----------------------------- GET ----------------------------- */

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const galleryId = Number(id);

  if (isNaN(galleryId)) {
    return NextResponse.json({ error: "Invalid gallery ID" }, { status: 400 });
  }

  try {
    const [item] = await db
      .select()
      .from(gallery)
      .where(eq(gallery.id, galleryId));

    if (!item) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error("Error fetching gallery item:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery item" },
      { status: 500 }
    );
  }
}

/* ---------------------------- DELETE ---------------------------- */

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const galleryId = Number(id);

  if (isNaN(galleryId)) {
    return NextResponse.json({ error: "Invalid gallery ID" }, { status: 400 });
  }

  try {
    const [item] = await db
      .select()
      .from(gallery)
      .where(eq(gallery.id, galleryId));

    if (!item) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    // Delete from Cloudinary
    if (item.imagePath) {
      await deleteFromCloudinary(item.imagePath);
    }

    await db.delete(gallery).where(eq(gallery.id, galleryId));

    return NextResponse.json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    return NextResponse.json(
      { error: "Failed to delete gallery item" },
      { status: 500 }
    );
  }
}

/* ----------------------------- PATCH ---------------------------- */

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const galleryId = Number(id);

  if (isNaN(galleryId)) {
    return NextResponse.json({ error: "Invalid gallery ID" }, { status: 400 });
  }

  try {
    const formData = await request.formData();

    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const file = formData.get("image") as File | null;

    const [existing] = await db
      .select()
      .from(gallery)
      .where(eq(gallery.id, galleryId));

    if (!existing) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    const updateData: any = {};

    if (title !== null) updateData.title = title;
    if (description !== null) updateData.description = description;

    // Image replacement
    if (file && file.name) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Only image files are allowed" },
          { status: 400 }
        );
      }

      const newUrl = await uploadToCloudinary(file, "gallery");
      updateData.imagePath = newUrl;

      // Delete old image
      if (existing.imagePath) {
        await deleteFromCloudinary(existing.imagePath);
      }
    }

    const [updated] = await db
      .update(gallery)
      .set(updateData)
      .where(eq(gallery.id, galleryId))
      .returning();

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating gallery item:", error);
    return NextResponse.json(
      { error: "Failed to update gallery item" },
      { status: 500 }
    );
  }
}
