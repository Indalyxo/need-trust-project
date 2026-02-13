import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { certificates } from "@/drizzle/schema";
import cloudinary from "@/lib/cloudinary";

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

    // Convert File → Buffer → Base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64File = `data:${mime};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(base64File, {
      folder: "certificates",
      resource_type: "auto", // image | pdf
    });

    // Save Cloudinary URL to DB
    await db.insert(certificates).values({
      title,
      description,
      image: uploadResult.secure_url,
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
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
