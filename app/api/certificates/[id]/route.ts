import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { certificates } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import path from "path";
import { unlink, writeFile } from "fs/promises";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  // ⬅️ You MUST await params in Next.js 15
  const { id } = await context.params;

  const numericId = Number(id);

  if (isNaN(numericId)) {
    return NextResponse.json(
      { error: "Invalid certificate ID" },
      { status: 400 }
    );
  }

  try {
    // fetch the certificate to get image path
    const [cert] = await db
      .select()
      .from(certificates)
      .where(eq(certificates.id, numericId));

    if (cert && cert.image) {
      try {
        const filePath = path.join(process.cwd(), "public", cert.image.replace(/^\//, ""));
        await unlink(filePath);
      } catch (err) {
        // file might not exist; log and continue
        console.error("Failed to remove certificate image:", err);
      }
    }

    await db.delete(certificates).where(eq(certificates.id, numericId));

    return NextResponse.json({ message: "Certificate deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete certificate" },
      { status: 500 }
    );
  }
}

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

    // fetch existing record
    const [existing] = await db
      .select()
      .from(certificates)
      .where(eq(certificates.id, numericId));

    const updateData: any = {};

    if (title !== null) updateData.title = title;
    if (description !== null) updateData.description = description;

    if (file && file.name) {
      const mime = file.type || "";
      if (!(mime.startsWith("image/") || mime === "application/pdf")) {
        return NextResponse.json(
          { success: false, message: "Only images or PDFs are allowed" },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(process.cwd(), "public/certificates", fileName);
      await writeFile(filePath, buffer);

      updateData.image = `/certificates/${fileName}`;

      // remove old file
      if (existing && existing.image) {
        try {
          const oldPath = path.join(process.cwd(), "public", existing.image.replace(/^\//, ""));
          await unlink(oldPath);
        } catch (err) {
          console.error("Failed to remove old image:", err);
        }
      }
    }

    await db.update(certificates).set(updateData).where(eq(certificates.id, numericId));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Failed to update" }, { status: 500 });
  }
}
