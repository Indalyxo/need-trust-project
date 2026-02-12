/**
 * Drizzle ORM Schema for File Uploads
 * 
 * This is an example schema that stores Cloudinary file URLs.
 * You should integrate this into your existing schema file.
 */

import { pgTable, serial, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

export const uploads = pgTable('uploads', {
    id: serial('id').primaryKey(),
    fileName: varchar('file_name', { length: 255 }).notNull(),
    fileType: varchar('file_type', { length: 100 }).notNull(),
    fileSize: integer('file_size').notNull(), // Size in bytes
    fileUrl: varchar('file_url', { length: 500 }).notNull(), // Cloudinary secure URL
    cloudinaryPublicId: varchar('cloudinary_public_id', { length: 255 }).notNull(),
    category: varchar('category', { length: 50 }).notNull(), // 'images', 'videos', or 'pdfs'
    uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
});

// TypeScript type inference
export type Upload = typeof uploads.$inferSelect;
export type NewUpload = typeof uploads.$inferInsert;
