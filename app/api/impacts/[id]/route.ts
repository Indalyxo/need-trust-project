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
    const formData = await req.formData();

    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const icon = formData.get("icon") as string | null;
    const statsValue = formData.get("statsValue") as string | null;
    const statsLabel = formData.get("statsLabel") as string | null;
    const file = formData.get("image") as File | null;

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

    if (title !== null) updateData.title = title;
    if (description !== null) updateData.description = description;
    if (icon !== null) updateData.icon = icon;
    if (statsValue !== null) updateData.statsValue = statsValue;
    if (statsLabel !== null) updateData.statsLabel = statsLabel;

    /* ---------- Image replacement ---------- */
    if (file && file.name) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { success: false, message: "Only image files allowed" },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      const upload = await cloudinary.uploader.upload(base64, {
        folder: "impacts",
        resource_type: "image",
      });

      updateData.imagePath = upload.secure_url;

      // 🔥 Remove old Cloudinary image
      if (existing.imagePath) {
        const oldPublicId = extractCloudinaryPublicId(existing.imagePath);
        if (oldPublicId) {
          await cloudinary.uploader.destroy(oldPublicId, {
            resource_type: "image",
          });
        }
      }
    }

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
