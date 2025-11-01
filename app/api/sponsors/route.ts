import { sponsors } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const allSponsors = await db.select().from(sponsors);
    return NextResponse.json(allSponsors, { status: 200 });
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    return NextResponse.json(
      { message: "Error while fetching sponsors", error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, name, link } = await req.json();

    if (!imageUrl || !name || !link) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const [newSponsor] = await db
      .insert(sponsors)
      .values({ imageUrl, name, link })
      .returning(); // ✅ returns the inserted row(s)

    return NextResponse.json(newSponsor, { status: 201 });
  } catch (error) {
    console.error("Error creating sponsor:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
