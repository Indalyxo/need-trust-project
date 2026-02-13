import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { certificates } from "@/drizzle/schema";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const title = form.get("title") as string;
    const description = form.get("description") as string;
    const file = form.get("photo") as File | null;

    if (!title || !file) {
      return NextResponse.json(
        { success: false, message: "Title & file required" },
        { status: 400 }
      );
    }

    // Accept images & PDFs
    const mime = file.type || "";
    if (!(mime.startsWith("image/") || mime === "application/pdf")) {
      return NextResponse.json(
        { success: false, message: "Only images or PDFs allowed" },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const uploadUrl = await uploadToCloudinary(file, "certificates", "auto");

    // Save Cloudinary URL to DB
    await db.insert(certificates).values({
      title,
      description,
      image: uploadUrl,
    });

    return NextResponse.json({
      success: true,
      url: uploadUrl,
    });
  } catch (error) {
    console.error("Certificate Upload Error:", error);
    return NextResponse.json(
      { success: false, message: "Error uploading certificate" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allCertificates = await db
      .select()
      .from(certificates)
      .orderBy(certificates.id);

    return NextResponse.json({ success: true, data: allCertificates });
  } catch (error) {
    console.error("Certificate Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching certificates" },
      { status: 500 }
    );
  }
}
