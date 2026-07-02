/**
 * @file src/types/express.d.ts
 * @description Express Request type augmentation.
 *
 * ARCHITECTURE DECISION:
 *   TypeScript's Declaration Merging lets us add properties to Express's Request
 *   interface globally. This means req.user, req.requestId, etc. are fully typed
 *   everywhere — no casting required.
 *
 *   These properties are added by middleware:
 *   - req.user      → added by authMiddleware (Phase 2) after JWT verification
 *   - req.requestId → added by a correlation-ID middleware (Phase 2)
 *   - req.startTime → added by requestLogger for response-time calculation
 */

import { JwtPayload, UserRole } from './common';

// Augment the Express namespace — this is picked up globally by TypeScript
declare global {
  namespace Express {
    interface Request {
      /**
       * Authenticated user payload, populated by JWT auth middleware (Phase 2).
       * Undefined if the route is public / unauthenticated.
       */
      user?: {
        id:    string;
        email: string;
        role:  UserRole;
      };

      /**
       * Unique request ID for distributed tracing (Phase 2).
       * Generated per-request by a correlation ID middleware.
       */
      requestId?: string;

      /**
       * High-resolution start timestamp — used for response time calculation.
       * Set by requestLogger middleware.
       */
      startTime?: [number, number]; // process.hrtime() tuple
    }
  }
}

// Required to make this file a module (TypeScript requirement for .d.ts augmentation)
export {};
