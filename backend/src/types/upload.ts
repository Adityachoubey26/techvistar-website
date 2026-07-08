/**
 * @file src/types/upload.ts
 * @description Shared types for the media upload module.
 */

/** Normalised image metadata returned after a successful Cloudinary upload. */
export interface UploadedImageResult {
  url:      string;
  publicId: string;
  width:    number;
  height:   number;
  format:   string;
}
