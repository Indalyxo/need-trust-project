import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { impacts } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);

    const result = await db
      .delete(impacts)
      .where(eq(impacts.id, id))
      .returning();

    if (!result.length) {
      return NextResponse.json(
        { success: false, message: "Impact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error("Error deleting impact:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete impact" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();
    const { title, description, imagePath, icon, statsValue, statsLabel } = body;

    const result = await db
      .update(impacts)
      .set({
        ...(title && { title }),
        ...(description && { description }),
        ...(imagePath && { imagePath }),
        ...(icon && { icon }),
        ...(statsValue && { statsValue }),
        ...(statsLabel && { statsLabel }),
        updatedAt: new Date(),
      })
      .where(eq(impacts.id, id))
      .returning();

    if (!result.length) {
      return NextResponse.json(
        { success: false, message: "Impact not found" },
        { status: 404 }
      );
    }

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
