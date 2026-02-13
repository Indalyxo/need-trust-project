import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// File type configurations
export const ALLOWED_FILE_TYPES = {
  images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  videos: ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'],
  pdfs: ['application/pdf'],
};

// Max file sizes (in bytes)
export const MAX_FILE_SIZES = {
  images: 10 * 1024 * 1024, // 10MB
  videos: 100 * 1024 * 1024, // 100MB
  pdfs: 10 * 1024 * 1024, // 10MB
};

// Cloudinary folder structure
export const CLOUDINARY_FOLDERS = {
  images: 'need-trust/images',
  videos: 'need-trust/videos',
  pdfs: 'need-trust/pdfs',
};

/**
 * Determines the file category based on MIME type
 */
export function getFileCategory(mimeType: string): 'images' | 'videos' | 'pdfs' | null {
  if (ALLOWED_FILE_TYPES.images.includes(mimeType)) return 'images';
  if (ALLOWED_FILE_TYPES.videos.includes(mimeType)) return 'videos';
  if (ALLOWED_FILE_TYPES.pdfs.includes(mimeType)) return 'pdfs';
  return null;
}

/**
 * Validates file type and size
 */
export function validateFile(file: File): { valid: boolean; error?: string; category?: 'images' | 'videos' | 'pdfs' } {
  const category = getFileCategory(file.type);
  
  if (!category) {
    return {
      valid: false,
      error: `Invalid file type: ${file.type}. Allowed types: images, videos, PDFs.`,
    };
  }

  const maxSize = MAX_FILE_SIZES[category];
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds maximum allowed size of ${maxSize / (1024 * 1024)}MB for ${category}.`,
    };
  }

  return { valid: true, category };
}

/**
 * Uploads a file to Cloudinary
 */
export async function uploadToCloudinary(
  fileBuffer: Buffer,
  category: 'images' | 'videos' | 'pdfs',
  originalFilename: string
): Promise<{ secure_url: string; public_id: string; resource_type: string }> {
  return new Promise((resolve, reject) => {
    const folder = CLOUDINARY_FOLDERS[category];
    
    // Determine resource type for Cloudinary
    const resourceType = category === 'videos' ? 'video' : category === 'pdfs' ? 'raw' : 'image';

    // Upload stream
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        use_filename: true,
        unique_filename: true,
        overwrite: false,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
            resource_type: result.resource_type,
          });
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
}

export default cloudinary;
