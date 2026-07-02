/**
 * @file src/routes/health.routes.ts
 * @description Health check route definitions.
 *
 * ARCHITECTURE DECISION:
 *   Each feature domain has its own router file. This file handles /health.
 *   The root router (routes/index.ts) mounts this under /api.
 *   Result: GET /api/health
 *
 *   Keeping routes and controllers separate means we can add middleware
 *   (auth, rate limiting, caching) to individual routes without touching controllers.
 */

import { Router } from 'express';
import { healthCheck } from '@/controllers/health.controller';

const router = Router();

// GET /api/health
// No authentication required — health checks must be publicly accessible
router.get('/', healthCheck);

export default router;
