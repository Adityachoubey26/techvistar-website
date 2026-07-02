/**
 * @file src/utils/ApiError.ts
 * @description Custom Error class for operational (expected) API errors.
 *
 * ARCHITECTURE DECISION:
 *   Node.js's built-in Error class has only `message` and `stack`.
 *   We extend it with:
 *   - statusCode:     HTTP status to return (404, 401, 422, etc.)
 *   - code:           Machine-readable error code for frontend error handling
 *   - errors:         Array of validation errors (multiple field errors at once)
 *   - isOperational:  true  → user/client error (log as warn, show message)
 *                     false → programming error (log as error, hide message in prod)
 *
 *   USAGE in controllers / services:
 *     throw new ApiError(404, 'Project not found');
 *     throw new ApiError(422, 'Validation failed', ERROR_CODES.VALIDATION_ERROR, fieldErrors);
 */

import { HTTP_STATUS, ERROR_CODES } from '@/constants';

type ErrorCode = string; // Matches ERROR_CODES values

export class ApiError extends Error {
  public readonly statusCode:     number;
  public readonly code:           ErrorCode;
  public readonly errors:         unknown[];
  public readonly isOperational:  boolean;

  constructor(
    statusCode:    number,
    message:       string,
    code:          ErrorCode    = ERROR_CODES.INTERNAL_ERROR,
    errors:        unknown[]    = [],
    isOperational: boolean      = true
  ) {
    super(message);  // Sets this.message and maintains prototype chain

    this.statusCode    = statusCode;
    this.code          = code;
    this.errors        = errors;
    this.isOperational = isOperational;

    // Fix prototype chain — required when extending built-ins in TypeScript
    Object.setPrototypeOf(this, ApiError.prototype);

    // Capture stack trace (removes ApiError constructor frame from trace)
    Error.captureStackTrace(this, this.constructor);
  }

  // ── Static factory methods — common errors with one line ──────────────────
  // Instead of: throw new ApiError(404, 'Not found', ERROR_CODES.NOT_FOUND)
  // Write:      throw ApiError.notFound('Project not found')

  static notFound(message = 'Resource not found'): ApiError {
    return new ApiError(HTTP_STATUS.NOT_FOUND, message, ERROR_CODES.NOT_FOUND);
  }

  static unauthorized(message = 'Authentication required'): ApiError {
    return new ApiError(HTTP_STATUS.UNAUTHORIZED, message, ERROR_CODES.UNAUTHORIZED);
  }

  static forbidden(message = 'You do not have permission to perform this action'): ApiError {
    return new ApiError(HTTP_STATUS.FORBIDDEN, message, ERROR_CODES.FORBIDDEN);
  }

  static badRequest(message = 'Invalid request', errors: unknown[] = []): ApiError {
    return new ApiError(HTTP_STATUS.BAD_REQUEST, message, ERROR_CODES.BAD_REQUEST, errors);
  }

  static conflict(message = 'Resource already exists'): ApiError {
    return new ApiError(HTTP_STATUS.CONFLICT, message, ERROR_CODES.CONFLICT);
  }

  static tooManyRequests(message = 'Too many requests. Please try again later.'): ApiError {
    return new ApiError(HTTP_STATUS.TOO_MANY_REQUESTS, message, ERROR_CODES.TOO_MANY_REQUESTS);
  }

  static validationError(message = 'Validation failed', errors: unknown[] = []): ApiError {
    return new ApiError(
      HTTP_STATUS.UNPROCESSABLE_ENTITY,
      message,
      ERROR_CODES.VALIDATION_ERROR,
      errors
    );
  }

  static internal(message = 'Internal server error'): ApiError {
    return new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message,
      ERROR_CODES.INTERNAL_ERROR,
      [],
      false  // Programming error — isOperational = false
    );
  }
}
