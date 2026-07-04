/**
 * @file src/routes/contact.routes.ts
 * @description Route definition for Contact Module.
 *
 * ARCHITECTURE DECISION:
 *   Exposes the public POST endpoint for form submissions.
 *   Mounted onto the index API router under /api/contact.
 */

import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { submitContactForm } from '@/controllers/contact.controller';
import { CONTACT_RATE_LIMIT } from '@/constants';

const router = Router();

const contactRateLimiter = rateLimit({
  windowMs:        CONTACT_RATE_LIMIT.WINDOW_MS,
  max:             CONTACT_RATE_LIMIT.MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders:   false,
  message: {
    success:    false,
    statusCode: 429,
    code:       'TOO_MANY_REQUESTS',
    message:    'Too many submissions from this IP. Please try again after 15 minutes.',
  },
});

// POST /api/contact
// Public submission route
router.post('/', contactRateLimiter, submitContactForm);

export default router;

