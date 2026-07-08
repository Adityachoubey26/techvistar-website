/**
 * @file src/routes/upload.routes.ts
 * @description Route definitions for CMS media uploads.
 */

import { Router } from 'express';
import { uploadImage } from '@/controllers/upload.controller';
import { authMiddleware } from '@/middleware/auth.middleware';
import { uploadImageMiddleware } from '@/middleware/upload.middleware';

const router = Router();

// POST /api/upload/image — authenticated admin image upload to Cloudinary
router.post('/image', authMiddleware, uploadImageMiddleware, uploadImage);

export default router;
