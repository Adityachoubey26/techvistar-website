/**
 * @file src/utils/ApiResponse.ts
 * @description Standardised success response wrapper for all controllers.
 *
 * ARCHITECTURE DECISION:
 *   Every API response — success or paginated — has the exact same JSON envelope.
 *   This prevents drift where one controller returns { data: [...] } and another
 *   returns { items: [...] }. The frontend/admin can write one shared client adapter.
 *
 *   Success envelope:
 *   {
 *     "success":    true,
 *     "statusCode": 200,
 *     "message":    "Projects fetched successfully",
 *     "data":       { ... }
 *   }
 *
 *   Paginated envelope (adds "pagination"):
 *   {
 *     "success":    true,
 *     "statusCode": 200,
 *     "message":    "Projects fetched successfully",
 *     "data":       [...],
 *     "pagination": {
 *       "total":      50,
 *       "page":       1,
 *       "limit":      10,
 *       "totalPages": 5,
 *       "hasNext":    true,
 *       "hasPrev":    false
 *     }
 *   }
 */

import { Response } from 'express';
import { HTTP_STATUS } from '@/constants';

// ─── Pagination metadata shape ─────────────────────────────────────────────────
export interface PaginationMeta {
  total:      number;
  page:       number;
  limit:      number;
  totalPages: number;
  hasNext:    boolean;
  hasPrev:    boolean;
}

// ─── Base response body shape (used by the frontend TypeScript client later) ──
export interface SuccessResponseBody<T = unknown> {
  success:     true;
  statusCode:  number;
  message:     string;
  data:        T;
  pagination?: PaginationMeta;
}

// ─── ApiResponse class ────────────────────────────────────────────────────────
export class ApiResponse {

  /**
   * Send a standard success response.
   *
   * @example
   * ApiResponse.success(res, project, 'Project fetched successfully');
   * ApiResponse.success(res, project, 'Project created', HTTP_STATUS.CREATED);
   */
  static success<T = unknown>(
    res:        Response,
    data:       T,
    message:    string = 'Success',
    statusCode: number = HTTP_STATUS.OK
  ): Response {
    const body: SuccessResponseBody<T> = {
      success: true,
      statusCode,
      message,
      data,
    };

    return res.status(statusCode).json(body);
  }

  /**
   * Send a paginated list response.
   *
   * @example
   * ApiResponse.paginated(res, projects, {
   *   total: 50, page: 1, limit: 10, totalPages: 5, hasNext: true, hasPrev: false
   * }, 'Projects fetched successfully');
   */
  static paginated<T = unknown>(
    res:        Response,
    data:       T[],
    pagination: PaginationMeta,
    message:    string = 'Success',
    statusCode: number = HTTP_STATUS.OK
  ): Response {
    const body: SuccessResponseBody<T[]> = {
      success: true,
      statusCode,
      message,
      data,
      pagination,
    };

    return res.status(statusCode).json(body);
  }

  /**
   * Helper: build PaginationMeta from raw numbers.
   * Call this in your service/controller to avoid calculating these manually every time.
   *
   * @example
   * const pagination = ApiResponse.buildPagination(totalCount, page, limit);
   */
  static buildPagination(total: number, page: number, limit: number): PaginationMeta {
    const totalPages = Math.ceil(total / limit);
    return {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  /**
   * Send a 204 No Content response (used for DELETE operations).
   * No body is sent — that's the HTTP spec for 204.
   */
  static noContent(res: Response): Response {
    return res.status(HTTP_STATUS.NO_CONTENT).send();
  }
}
