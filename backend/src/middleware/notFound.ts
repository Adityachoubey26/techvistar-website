/**
 * @file src/middleware/notFound.ts
 * @description 404 middleware — catches requests to routes that don't exist.
 *
 * ARCHITECTURE DECISION:
 *   This middleware is registered AFTER all valid route definitions in app.ts.
 *   Any request that falls through to this point matched no registered route.
 *   It creates an ApiError and passes it to next(), which triggers errorHandler.ts.
 *   This keeps all error formatting logic in ONE place (errorHandler).
 */

import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/utils/ApiError';
import { HTTP_STATUS, ERROR_CODES } from '@/constants';

export function notFound(req: Request, _res: Response, next: NextFunction): void {
  // Build a structured error with route and method for debugging
  const error = new ApiError(
    HTTP_STATUS.NOT_FOUND,
    `Route not found: ${req.method} ${req.originalUrl}`,
    ERROR_CODES.NOT_FOUND
  );

  next(error);
}
