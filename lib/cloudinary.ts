// lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default cloudinary;

/**
 * Extract Cloudinary public_id from a secure_url
 * Example: https://res.cloudinary.com/demo/image/upload/v1234/folder/file.jpg
 * Returns: folder/file
 */
export function extractCloudinaryPublicId(url: string): string | null {
  try {
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;

    return parts[1]
      .replace(/^v\d+\//, "") // Remove version prefix
      .replace(/\.[^/.]+$/, ""); // Remove file extension
  } catch {
    return null;
  }
}

/**
 * Upload a file to Cloudinary
 */
export async function uploadToCloudinary(
  file: File,
  folder: string,
  resourceType?: "image" | "auto"
): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64File = `data:${file.type};base64,${buffer.toString("base64")}`;

  // Determine the correct resource type
  let actualResourceType: "image" | "raw" = "image";

  if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
    actualResourceType = "raw";
  } else if (resourceType === "auto" && !file.type.startsWith("image/")) {
    actualResourceType = "raw";
  }

  const uploadOptions: any = {
    folder,
    resource_type: actualResourceType,
  };

  // For PDFs, set type to 'upload' and use proper flags
  if (actualResourceType === "raw") {
    uploadOptions.type = "upload";
    uploadOptions.flags = "attachment:inline";
  }

  const result = await cloudinary.uploader.upload(base64File, uploadOptions);

  return result.secure_url;
}

/**
 * Delete a file from Cloudinary
 * Automatically detects resource type based on file extension
 */
export async function deleteFromCloudinary(url: string): Promise<void> {
  const publicId = extractCloudinaryPublicId(url);
  if (!publicId) return;

  // Determine resource type based on file extension
  let resourceType: "image" | "video" | "raw" = "image";

  if (url.includes(".pdf")) {
    resourceType = "raw";
  } else if (url.match(/\.(mp4|mov|avi|webm)$/i)) {
    resourceType = "video";
  }

  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  } catch (error) {
    console.error(`Failed to delete from Cloudinary: ${publicId}`, error);
    // Don't throw - deletion failure shouldn't break the request
  }
}
