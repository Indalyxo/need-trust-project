import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sponsors } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";

/* ----------------------------- GET ----------------------------- */

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const sponsorId = Number(id);

  if (isNaN(sponsorId)) {
    return NextResponse.json({ error: "Invalid sponsor ID" }, { status: 400 });
  }

  try {
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

    return NextResponse.json({ success: true, data: sponsor });
  } catch (error) {
    console.error("Error fetching sponsor:", error);
    return NextResponse.json(
      { error: "Failed to fetch sponsor" },
      { status: 500 }
    );
  }
}

/* ---------------------------- DELETE ---------------------------- */

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

    // Delete image from Cloudinary
    if (sponsor.imageUrl) {
      await deleteFromCloudinary(sponsor.imageUrl);
    }

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

/* ----------------------------- PATCH ---------------------------- */

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const sponsorId = Number(id);

  if (isNaN(sponsorId)) {
    return NextResponse.json({ error: "Invalid sponsor ID" }, { status: 400 });
  }

  try {
    const formData = await request.formData();

    const name = formData.get("name") as string | null;
    const link = formData.get("link") as string | null;
    const file = formData.get("image") as File | null;

    const [existing] = await db
      .select()
      .from(sponsors)
      .where(eq(sponsors.id, sponsorId));

    if (!existing) {
      return NextResponse.json(
        { error: "Sponsor not found" },
        { status: 404 }
      );
    }

    const updateData: any = {};

    if (name !== null) updateData.name = name;
    if (link !== null) updateData.link = link;

    // Image replacement
    if (file && file.name) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Only image files are allowed" },
          { status: 400 }
        );
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: "Image must be under 5MB" },
          { status: 400 }
        );
      }

      const newUrl = await uploadToCloudinary(file, "sponsors");
      updateData.imageUrl = newUrl;

      // Delete old image
      if (existing.imageUrl) {
        await deleteFromCloudinary(existing.imageUrl);
      }
    }

    const [updated] = await db
      .update(sponsors)
      .set(updateData)
      .where(eq(sponsors.id, sponsorId))
      .returning();

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating sponsor:", error);
    return NextResponse.json(
      { error: "Failed to update sponsor" },
      { status: 500 }
    );
  }
}

