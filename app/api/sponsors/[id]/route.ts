import { sponsors } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// GET sponsor by ID
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await here
    const numId = Number(id);

    if (isNaN(numId)) {
      return NextResponse.json({ message: "Invalid sponsor ID" }, { status: 400 });
    }

    const sponsor = await db.select().from(sponsors).where(eq(sponsors.id, numId));

    if (!sponsor.length) {
      return NextResponse.json({ message: "Sponsor not found" }, { status: 404 });
    }

    return NextResponse.json(sponsor[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

// UPDATE sponsor by ID
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await here
    const numId = Number(id);

    const { imageUrl, name, link } = await req.json();

    const [updatedSponsor] = await db
      .update(sponsors)
      .set({ imageUrl, name, link })
      .where(eq(sponsors.id, numId))
      .returning();

    if (!updatedSponsor) {
      return NextResponse.json({ message: "Sponsor not found or not updated" }, { status: 404 });
    }

    return NextResponse.json(updatedSponsor);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

// DELETE sponsor by ID
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await here
    const numId = Number(id);

    const deleted = await db.delete(sponsors).where(eq(sponsors.id, numId)).returning();

    if (!deleted.length) {
      return NextResponse.json({ message: "Sponsor not found" }, { status: 404 });
    }

    return NextResponse.json({ message: `Sponsor ${numId} deleted.`, deleted });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
