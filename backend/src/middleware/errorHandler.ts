/**
 * @file src/middleware/errorHandler.ts
 * @description Global error handler middleware — the single exit point for ALL errors.
 *
 * ARCHITECTURE DECISION:
 *   Express recognises a 4-argument middleware (err, req, res, next) as an error handler.
 *   This must be registered LAST in app.ts — after all routes AND the 404 handler.
 *
 *   Error pipeline:
 *     throw new ApiError(404, 'Not found')  →  controller
 *     next(error)                            →  notFound / route handler
 *     errorHandler formats + responds        →  client
 *
 *   Two modes:
 *   - Operational errors  (ApiError, isOperational=true):  send structured JSON
 *   - Programming errors  (unexpected): log full stack, send 500 in production
 */

import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { ApiError } from '@/utils/ApiError';
import { logger } from '@/utils/logger';
import { HTTP_STATUS, ERROR_CODES } from '@/constants';
import { env } from '@/config/env';

// ─── Shape of the error response body ────────────────────────────────────────
interface ErrorResponseBody {
  success:    false;
  statusCode: number;
  code:       string;
  message:    string;
  errors?:    unknown[];      // Validation errors array (Phase 2)
  stack?:     string;         // Only included in development
}

export function errorHandler(
  err:  Error,
  req:  Request,
  res:  Response,
  _next: NextFunction   // Must accept 4 args — Express identifies this as error handler
): void {
  // Use plain mutable types to allow assignment across branches
  let statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let code:       string = ERROR_CODES.INTERNAL_ERROR;
  let message:    string = 'An unexpected error occurred';
  let errors: unknown[] | undefined;

  // ── Case 1: Our own ApiError (operational / expected) ──────────────────────
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    code       = err.code;
    message    = err.message;
    errors     = err.errors;

    // Only log as 'warn' — these are expected (404, 401, etc.)
    logger.warn(`[ErrorHandler] ApiError ${statusCode}: ${message}`, {
      code, url: req.originalUrl, method: req.method,
    });
  }

  // ── Case 2: Mongoose CastError (invalid ObjectId in URL param) ─────────────
  // e.g. GET /api/users/not-a-valid-id  → Mongoose throws CastError
  else if (err instanceof mongoose.Error.CastError) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    code       = ERROR_CODES.BAD_REQUEST;
    message    = `Invalid value for field: ${err.path}`;
    logger.warn(`[ErrorHandler] CastError: ${message}`);
  }

  // ── Case 3: Mongoose ValidationError (schema validation failed) ────────────
  else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = HTTP_STATUS.UNPROCESSABLE_ENTITY;
    code       = ERROR_CODES.VALIDATION_ERROR;
    message    = 'Database validation failed';
    errors     = Object.values(err.errors).map((e) => {
      const ve = e as mongoose.Error.ValidatorError | mongoose.Error.CastError;
      return { field: ve.path, message: ve.message };
    });
    logger.warn(`[ErrorHandler] ValidationError: ${message}`, { errors });
  }

  // ── Case 4: MongoDB duplicate key error (unique constraint violated) ───────
  // e.g. inserting a user with an email that already exists
  else if (String((err as any).code) === '11000') {
    statusCode = HTTP_STATUS.CONFLICT;
    code       = ERROR_CODES.DUPLICATE_KEY;
    const field = extractDuplicateField(err.message);
    message    = `A record with this ${field} already exists`;
    logger.warn(`[ErrorHandler] DuplicateKey: ${message}`);
  }

  // ── Case 5: JWT errors (Phase 2 — handled now to avoid 500s) ──────────────
  else if (err.name === 'JsonWebTokenError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    code       = ERROR_CODES.INVALID_TOKEN;
    message    = 'Invalid authentication token';
  }
  else if (err.name === 'TokenExpiredError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    code       = ERROR_CODES.TOKEN_EXPIRED;
    message    = 'Authentication token has expired';
  }

  // ── Case 6: Unexpected / programming error ─────────────────────────────────
  else {
    // Log the full stack — this is a bug, not a user error
    logger.error('[ErrorHandler] Unexpected error:', {
      message: err.message,
      stack:   err.stack,
      url:     req.originalUrl,
      method:  req.method,
    });

    // In production: don't leak internal details to the client
    if (env.isProd) {
      message = 'An unexpected internal error occurred';
    } else {
      message = err.message; // Show real message in development
    }
  }

  // ── Build and send response ─────────────────────────────────────────────────
  const body: ErrorResponseBody = {
    success: false,
    statusCode,
    code,
    message,
    ...(errors                    && { errors }),
    ...(env.isDev && err.stack    && { stack: err.stack }),
  };

  res.status(statusCode).json(body);
}

// ─── Helper: extract duplicate field name from MongoDB error message ──────────
// MongoDB error message format: 'E11000 duplicate key error collection: ... index: email_1 ...'
function extractDuplicateField(message: string): string {
  const match = message.match(/index: (\w+)_\d+/);
  return match?.[1] ?? 'field';
}
