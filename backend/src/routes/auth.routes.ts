/**
 * @file src/routes/auth.routes.ts
 * @description Route definitions for admin authentication endpoints.
 */

import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { authController } from '@/controllers/auth.controller';
import { env } from '@/config/env';

const router = Router();

const loginRateLimiter = rateLimit({
  windowMs: env.loginRateLimitWindow,
  max: env.loginRateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    statusCode: 429,
    code: 'TOO_MANY_REQUESTS',
    message: 'Too many login attempts. Please try again later.',
  },
});

router.get('/me', authController.me);
router.post('/login', loginRateLimiter, authController.login);
router.post('/logout', authController.logout);

export default router;
