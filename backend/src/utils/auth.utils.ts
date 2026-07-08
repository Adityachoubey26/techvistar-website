/**
 * @file src/utils/auth.utils.ts
 * @description Shared utilities for auth token handling.
 */

import { env } from '@/config/env';

export function parseExpiryToMs(expiry: string): number {
  const match = expiry.match(/^(\d+)([smhd])$/i);

  if (!match) {
    return 15 * 60 * 1000;
  }

  const value = Number(match[1]);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case 's':
      return value * 1000;
    case 'm':
      return value * 60 * 1000;
    case 'h':
      return value * 60 * 60 * 1000;
    case 'd':
      return value * 24 * 60 * 60 * 1000;
    default:
      return 15 * 60 * 1000;
  }
}

/** Cookie options for the HttpOnly access token — dev uses lax/non-secure for localhost HTTP. */
export function getAccessTokenCookieOptions() {
  return {
    httpOnly: true,
    secure:   env.isProd,
    sameSite: env.isProd ? 'none' as const : 'lax' as const,
    maxAge:   parseExpiryToMs(env.accessTokenExpiry),
    path:     '/',
  };
}

/** Extract Bearer token from Authorization header or return undefined. */
export function extractBearerToken(authHeader?: string): string | undefined {
  if (!authHeader) return undefined;
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || undefined;
}
