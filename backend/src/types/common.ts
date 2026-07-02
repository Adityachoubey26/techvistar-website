/**
 * @file src/types/common.ts
 * @description Shared TypeScript interfaces and types used across the backend.
 *
 * ARCHITECTURE DECISION:
 *   Types that are used in 2+ files belong here, not in the file where they're first used.
 *   This prevents circular imports and keeps type definitions discoverable.
 */

import { Document, Types } from 'mongoose';

// ─── Base document interface ──────────────────────────────────────────────────
// All Mongoose models will extend this — ensures consistent _id, createdAt, updatedAt
export interface BaseDocument extends Document {
  _id:       Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Pagination ───────────────────────────────────────────────────────────────
export interface PaginationOptions {
  page:  number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data:       T[];
  total:      number;
  page:       number;
  limit:      number;
  totalPages: number;
  hasNext:    boolean;
  hasPrev:    boolean;
}

// ─── API Response envelope shapes (for frontend TypeScript consumption) ───────
export interface ApiSuccessResponse<T = unknown> {
  success:     true;
  statusCode:  number;
  message:     string;
  data:        T;
  pagination?: {
    total:      number;
    page:       number;
    limit:      number;
    totalPages: number;
    hasNext:    boolean;
    hasPrev:    boolean;
  };
}

export interface ApiErrorResponse {
  success:    false;
  statusCode: number;
  code:       string;
  message:    string;
  errors?:    unknown[];
  stack?:     string;
}

// ─── Role-Based Access Control (Phase 2) ──────────────────────────────────────
export type UserRole = 'admin' | 'editor' | 'viewer' | 'superadmin';

// ─── Auth Token payload (Phase 2) ─────────────────────────────────────────────
export interface JwtPayload {
  sub:   string;    // User ID
  email: string;
  role:  UserRole;
  iat?:  number;    // Issued at
  exp?:  number;    // Expires at
}

// ─── File upload (Phase 3 — Cloudinary) ───────────────────────────────────────
export interface UploadedFile {
  url:          string;
  publicId:     string;
  format:       string;
  width?:       number;
  height?:      number;
  sizeBytes?:   number;
  resourceType: 'image' | 'video' | 'raw';
}

// ─── Generic CRUD repository contract (Phase 2) ───────────────────────────────
// All future repositories will implement this interface
export interface IRepository<T extends BaseDocument> {
  findById(id: string): Promise<T | null>;
  findAll(options?: PaginationOptions): Promise<PaginatedResult<T>>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
