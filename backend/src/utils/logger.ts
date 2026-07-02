/**
 * @file src/utils/logger.ts
 * @description Winston-based structured logger.
 *
 * ARCHITECTURE DECISION:
 *   Two transports:
 *   1. Console — coloured, human-readable in development; JSON in production
 *   2. File — always JSON so log aggregators (Datadog, Papertrail, ELK) can parse it
 *
 *   Log levels in descending severity:
 *   error (0) > warn (1) > info (2) > http (3) > debug (4)
 *
 *   In production, LOG_LEVEL defaults to 'http' so debug logs are suppressed.
 *   In development, LOG_LEVEL defaults to 'debug' so everything is visible.
 */

import path from 'path';
import winston from 'winston';
import { env } from '@/config/env';

const { combine, timestamp, printf, colorize, align, json, errors } = winston.format;

// ─── Log directory ────────────────────────────────────────────────────────────
// Stored at backend/logs/ — this directory is gitignored
const LOG_DIR = path.join(process.cwd(), 'logs');

// ─── Custom format for console output (development) ──────────────────────────
const consoleFormat = combine(
  colorize({ all: true }),         // Colour-code by level (red=error, yellow=warn, etc.)
  timestamp({ format: 'HH:mm:ss' }),
  align(),
  printf((info) => {
    const ts      = String(info['timestamp'] ?? '');
    const level   = String(info.level ?? '');
    const message = String(info.message ?? '');
    const stack   = info['stack'] ? `\n${String(info['stack'])}` : '';

    // Build metadata — exclude known fields so only extra data is shown
    const { level: _l, message: _m, timestamp: _t, stack: _s, ...meta } = info as Record<string, unknown>;
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';

    return `${ts} [${level}] ${message}${metaStr}${stack}`;
  })
);

// ─── Custom format for file output (always JSON) ─────────────────────────────
const fileFormat = combine(
  errors({ stack: true }),         // Include stack traces in log files
  timestamp(),                     // ISO timestamp
  json()                           // Structured JSON — parseable by log aggregators
);

// ─── Transports ───────────────────────────────────────────────────────────────
const transports: winston.transport[] = [
  // Console transport — human-readable in dev, JSON in prod
  new winston.transports.Console({
    format: env.isDev ? consoleFormat : fileFormat,
  }),

  // File transport — all levels above or equal to LOG_LEVEL
  new winston.transports.File({
    filename: path.join(LOG_DIR, 'combined.log'),
    format: fileFormat,
    maxsize: 10 * 1024 * 1024,  // 10MB per file
    maxFiles: 5,                 // Keep last 5 rotated files
  }),

  // Separate error-only file — makes it easy to monitor just failures
  new winston.transports.File({
    filename: path.join(LOG_DIR, 'error.log'),
    level: 'error',
    format: fileFormat,
    maxsize: 10 * 1024 * 1024,
    maxFiles: 5,
  }),
];

// ─── Logger instance ─────────────────────────────────────────────────────────
export const logger = winston.createLogger({
  // Log level comes from env — default 'http' (suppresses debug in prod)
  level: env.logLevel,

  // Attach error stack traces automatically
  format: combine(errors({ stack: true }), timestamp()),

  transports,

  // In production: do NOT exit on error (let the error handler deal with it)
  exitOnError: false,
});

// ─── Morgan stream adapter ────────────────────────────────────────────────────
// Morgan's default output goes to stdout. This stream redirects it through
// Winston so HTTP request logs appear in the log files alongside app logs.
export const morganStream = {
  write: (message: string) => {
    // Morgan appends a newline — trim it so Winston doesn't double-newline
    logger.http(message.trim());
  },
};

// ─── Convenience: log unhandled rejections ────────────────────────────────────
// Called once from server.ts — ensures promise rejections are logged properly
export function setupProcessLogger(): void {
  process.on('uncaughtException', (err: Error) => {
    logger.error('Uncaught Exception:', { message: err.message, stack: err.stack });
    process.exit(1); // Always exit on uncaught exception — state is corrupted
  });

  process.on('unhandledRejection', (reason: unknown) => {
    const message = reason instanceof Error ? reason.message : String(reason);
    const stack   = reason instanceof Error ? reason.stack  : undefined;
    logger.error('Unhandled Promise Rejection:', { message, stack });
    // Do NOT exit here — let server.ts handle graceful shutdown
  });
}
