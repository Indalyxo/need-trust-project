import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { news } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import cloudinary from "@/lib/cloudinary";

/* ----------------------------- GET ----------------------------- */

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const newsId = Number(id);

  if (isNaN(newsId)) {
    return NextResponse.json({ error: "Invalid news ID" }, { status: 400 });
  }

  try {
    const [article] = await db
      .select()
      .from(news)
      .where(eq(news.id, newsId));

    if (!article) {
      return NextResponse.json(
        { error: "News article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
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
  const newsId = Number(id);

  if (isNaN(newsId)) {
    return NextResponse.json({ error: "Invalid news ID" }, { status: 400 });
  }

  try {
    const [article] = await db
      .select()
      .from(news)
      .where(eq(news.id, newsId));

    if (!article) {
      return NextResponse.json(
        { error: "News article not found" },
        { status: 404 }
      );
    }

    // 🔥 Delete image from Cloudinary
    if (article.imageUrl) {
      const publicId = extractCloudinaryPublicId(article.imageUrl);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId, {
          resource_type: "image",
        });
      }
    }

    await db.delete(news).where(eq(news.id, newsId));

    return NextResponse.json({
      success: true,
      message: "News article deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      { error: "Failed to delete news" },
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
  const newsId = Number(id);

  if (isNaN(newsId)) {
    return NextResponse.json({ error: "Invalid news ID" }, { status: 400 });
  }

  try {
    const formData = await request.formData();

    const title = formData.get("title") as string | null;
    const content = formData.get("content") as string | null;
    const file = formData.get("image") as File | null;

    const [existing] = await db
      .select()
      .from(news)
      .where(eq(news.id, newsId));

    if (!existing) {
      return NextResponse.json(
        { error: "News article not found" },
        { status: 404 }
      );
    }

    const updateData: any = {};

    if (title !== null) updateData.title = title;
    if (content !== null) updateData.content = content;

    /* --------- Image replacement --------- */
    if (file && file.name) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Only image files are allowed" },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      const upload = await cloudinary.uploader.upload(base64, {
        folder: "news",
        resource_type: "image",
      });

      updateData.imageUrl = upload.secure_url;

      // 🔥 Delete old Cloudinary image
      if (existing.imageUrl) {
        const oldPublicId = extractCloudinaryPublicId(existing.imageUrl);
        if (oldPublicId) {
          await cloudinary.uploader.destroy(oldPublicId, {
            resource_type: "image",
          });
        }
      }
    }

    const [updated] = await db
      .update(news)
      .set(updateData)
      .where(eq(news.id, newsId))
      .returning();

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      { error: "Failed to update news" },
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
