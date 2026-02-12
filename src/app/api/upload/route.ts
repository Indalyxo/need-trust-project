import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { uploads } from '@/db/schema';
import { validateFile, uploadToCloudinary } from '@/lib/cloudinary';

/**
 * POST /api/upload
 * Handles file uploads to Cloudinary and stores URLs in database
 */
export async function POST(request: NextRequest) {
    try {
        // Parse form data
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate file type and size
        const validation = validateFile(file);
        if (!validation.valid) {
            return NextResponse.json(
                { success: false, error: validation.error },
                { status: 400 }
            );
        }

        const { category } = validation;
        if (!category) {
            return NextResponse.json(
                { success: false, error: 'Unable to determine file category' },
                { status: 400 }
            );
        }

        // Convert file to buffer for Cloudinary upload
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const uploadResult = await uploadToCloudinary(buffer, category, file.name);

        // Store file URL in database using Drizzle ORM
        const [uploadRecord] = await db
            .insert(uploads)
            .values({
                fileName: file.name,
                fileType: file.type,
                fileSize: file.size,
                fileUrl: uploadResult.secure_url,
                cloudinaryPublicId: uploadResult.public_id,
                category,
                uploadedAt: new Date(),
            })
            .returning();

        // Return success response
        return NextResponse.json(
            {
                success: true,
                data: {
                    id: uploadRecord.id,
                    fileName: uploadRecord.fileName,
                    fileUrl: uploadRecord.fileUrl,
                    category: uploadRecord.category,
                    uploadedAt: uploadRecord.uploadedAt,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Upload error:', error);

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to upload file',
            },
            { status: 500 }
        );
    }
}

/**
 * GET /api/upload
 * Optional: Retrieve all uploaded files
 */
export async function GET() {
    try {
        const allUploads = await db.select().from(uploads).orderBy(uploads.uploadedAt);

        return NextResponse.json(
            {
                success: true,
                data: allUploads,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Fetch error:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch uploads',
            },
            { status: 500 }
        );
    }
}
