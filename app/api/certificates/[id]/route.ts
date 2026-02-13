import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { certificates } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";

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

    // Delete from Cloudinary
    if (cert.image) {
      await deleteFromCloudinary(cert.image);
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

    // New file upload
    if (file && file.name) {
      const mime = file.type || "";
      if (!(mime.startsWith("image/") || mime === "application/pdf")) {
        return NextResponse.json(
          { error: "Only images or PDFs are allowed" },
          { status: 400 }
        );
      }

      const newUrl = await uploadToCloudinary(file, "certificates", "auto");
      updateData.image = newUrl;

      // Delete old file
      if (existing.image) {
        await deleteFromCloudinary(existing.image);
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
