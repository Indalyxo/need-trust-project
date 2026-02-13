import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { certificates } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import cloudinary from "@/lib/cloudinary";

/* -------------------------------- DELETE -------------------------------- */

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: "Invalid certificate ID" }, { status: 400 });
  }

  try {
    const [cert] = await db
      .select()
      .from(certificates)
      .where(eq(certificates.id, numericId));

    if (!cert) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    // 🔥 Delete from Cloudinary
    if (cert.image) {
      const publicId = extractCloudinaryPublicId(cert.image);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId, {
          resource_type: "auto",
        });
      }
    }

    await db.delete(certificates).where(eq(certificates.id, numericId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Certificate Error:", error);
    return NextResponse.json(
      { error: "Failed to delete certificate" },
      { status: 500 }
    );
  }
}

/* -------------------------------- PATCH -------------------------------- */

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: "Invalid certificate ID" }, { status: 400 });
  }

  try {
    const form = await req.formData();

    const title = form.get("title") as string | null;
    const description = form.get("description") as string | null;
    const file = form.get("photo") as File | null;

    const [existing] = await db
      .select()
      .from(certificates)
      .where(eq(certificates.id, numericId));

    if (!existing) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    const updateData: any = {};
    if (title !== null) updateData.title = title;
    if (description !== null) updateData.description = description;

    // 🔥 New file upload
    if (file && file.name) {
      const mime = file.type || "";
      if (!(mime.startsWith("image/") || mime === "application/pdf")) {
        return NextResponse.json(
          { error: "Only images or PDFs are allowed" },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = `data:${mime};base64,${buffer.toString("base64")}`;

      const upload = await cloudinary.uploader.upload(base64, {
        folder: "certificates",
        resource_type: "auto",
      });

      updateData.image = upload.secure_url;

      // 🔥 Delete old Cloudinary file
      if (existing.image) {
        const oldPublicId = extractCloudinaryPublicId(existing.image);
        if (oldPublicId) {
          await cloudinary.uploader.destroy(oldPublicId, {
            resource_type: "auto",
          });
        }
      }
    }

    await db
      .update(certificates)
      .set(updateData)
      .where(eq(certificates.id, numericId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update Certificate Error:", error);
    return NextResponse.json(
      { error: "Failed to update certificate" },
      { status: 500 }
    );
  }
}

/* --------------------------- Helper Function ---------------------------- */

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
