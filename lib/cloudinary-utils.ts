/**
 * Client-safe Cloudinary utility functions
 * These functions don't require the Cloudinary SDK and can be used in client components
 */

/**
 * Convert Cloudinary URL to inline viewing (prevents download)
 * Uses Cloudinary's transformation parameters to force inline display
 */
export function getInlineViewUrl(url: string): string {
  if (!url) return url;
  
  // Check if it's a PDF or raw file
  if (url.includes(".pdf") || url.includes("/raw/upload/")) {
    // Cloudinary transformation to prevent download and show inline
    // We add flags=attachment:inline or use Content-Disposition override
    
    if (!url.includes("fl_attachment")) {
      // Insert transformation flags after /upload/
      // The correct format is: /upload/fl_attachment:inline/
      return url.replace("/upload/", "/upload/fl_attachment:inline/");
    }
  }
  
  return url;
}

/**
 * Check if a URL is a PDF
 */
export function isPdfUrl(url: string): boolean {
  if (!url) return false;
  return url.includes('/raw/upload/') || 
         url.includes('.pdf') ||
         !!url.match(/\/upload\/v\d+\/[^/]+\/[^/]+\.pdf/i);
}
