/**
 * @file src/controllers/upload.controller.ts
 * @description Controller for media upload endpoints.
 */

import { Request, Response, NextFunction } from 'express';
import { cloudinaryService } from '@/services/cloudinary.service';
import { ApiResponse } from '@/utils/ApiResponse';
import { ApiError } from '@/utils/ApiError';
import { HTTP_STATUS, UPLOAD } from '@/constants';

/**
 * POST /api/upload/image
 * Accepts a single image file and uploads it to Cloudinary.
 * Returns { url, publicId, width, height, format }.
 */
export async function uploadImage(
  req:  Request,
  res:  Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.file) {
      throw ApiError.badRequest(
        `No image file provided. Send a multipart/form-data request with field "${UPLOAD.FIELD_NAME}".`
      );
    }

    const result = await cloudinaryService.uploadImage(req.file);

    ApiResponse.success(
      res,
      result,
      'Image uploaded successfully',
      HTTP_STATUS.CREATED
    );
  } catch (err) {
    next(err);
  }
}
