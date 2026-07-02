/**
 * @file src/middleware/requestLogger.ts
 * @description Morgan HTTP request logger piped through Winston.
 *
 * ARCHITECTURE DECISION:
 *   Morgan is the industry standard for Express HTTP logging.
 *   By default it writes to stdout. We redirect its output through Winston
 *   so ALL logs (HTTP + app) go to the same files with consistent formatting.
 *
 *   Two formats:
 *   - 'dev'      in development: coloured, compact (GET /api/health 200 4ms)
 *   - 'combined' in production:  Apache-style with IP, user agent, referer (for analytics)
 */

import morgan from 'morgan';
import { morganStream } from '@/utils/logger';
import { env } from '@/config/env';

// Morgan format string
// 'dev'      → :method :url :status :response-time ms
// 'combined' → Apache Combined Log Format (rich, used by nginx/Apache analytics tools)
const FORMAT = env.isDev ? 'dev' : 'combined';

export const requestLogger = morgan(FORMAT, {
  stream: morganStream,

  // Skip logging for health check endpoint to avoid log noise
  // The health endpoint is polled every N seconds by load balancers / monitoring tools
  skip: (req) => req.url === '/api/health' && env.isProd,
});
