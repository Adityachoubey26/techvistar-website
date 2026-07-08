/**
 * @file src/services/upload.service.ts
 * @description Thin upload facade — Cloudinary logic lives in cloudinary.service.
 */

import { cloudinaryService } from '@/services/cloudinary.service';
import { UploadedImageResult } from '@/types/upload';

class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<UploadedImageResult> {
    return cloudinaryService.uploadImage(file);
  }
}

export const uploadService = new UploadService();
