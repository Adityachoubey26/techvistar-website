/**
 * @file src/types/upload.ts
 * @description Shared types for CMS media uploads.
 */

export interface UploadedImageData {
  imageUrl: string;
  publicId: string;
  width:    number;
  height:   number;
  format:   string;
}

export interface UploadApiResponse {
  url:      string;
  publicId: string;
  width:    number;
  height:   number;
  format:   string;
}
