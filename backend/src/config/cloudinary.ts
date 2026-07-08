/**
 * @file src/config/cloudinary.ts
 * @description Configured Cloudinary SDK instance for media uploads.
 *
 * ARCHITECTURE DECISION:
 *   Credentials are read exclusively through `@/config/env` (never process.env
 *   directly). This module only configures and exports a reusable `cloudinary`
 *   instance — upload routes and CMS wiring belong in a later phase.
 *
 *   Importing this module at startup ensures the SDK is ready before any
 *   upload service runs. Missing Cloudinary env vars already fail fast in
 *   env.ts via `required()`.
 */

import { v2 as cloudinary } from 'cloudinary';
import { env } from '@/config/env';
import { logger } from '@/utils/logger';

cloudinary.config({
  cloud_name: env.cloudinaryCloudName,
  api_key:    env.cloudinaryApiKey,
  api_secret: env.cloudinaryApiSecret,
  secure:     true, // Always serve HTTPS delivery URLs
});

logger.info('[Cloudinary] ✓ SDK configured', {
  cloudName: env.cloudinaryCloudName,
});

export { cloudinary };
export default cloudinary;
