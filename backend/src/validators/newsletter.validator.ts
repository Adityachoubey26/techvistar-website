/**
 * @file src/validators/newsletter.validator.ts
 * @description Native validator for Newsletter subscription form input.
 */

import { ApiError } from '@/utils/ApiError';
import { VALIDATION } from '@/constants';

interface NewsletterInput {
  email?: unknown;
  source?: unknown;
}

export function validateNewsletterInput(input: NewsletterInput): {
  email: string;
  source: typeof VALIDATION.NEWSLETTER_SOURCES[number];
} {
  const errors: Array<{ field: string; message: string }> = [];

  // 1. Email check
  if (input.email === undefined || input.email === null || String(input.email).trim() === '') {
    errors.push({ field: 'email', message: 'Email is required' });
  } else {
    const emailStr = String(input.email).trim().toLowerCase();
    if (!VALIDATION.EMAIL_REGEX.test(emailStr)) {
      errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }
  }

  // 2. Source check
  let finalSource: typeof VALIDATION.NEWSLETTER_SOURCES[number] = 'footer';
  if (input.source !== undefined && input.source !== null) {
    const sourceStr = String(input.source).trim();
    const validSources = VALIDATION.NEWSLETTER_SOURCES as readonly string[];
    if (!validSources.includes(sourceStr)) {
      errors.push({
        field: 'source',
        message: `Source must be one of: ${validSources.join(', ')}`,
      });
    } else {
      finalSource = sourceStr as any;
    }
  }

  if (errors.length > 0) {
    throw ApiError.validationError('Validation failed', errors);
  }

  return {
    email: String(input.email).trim().toLowerCase(),
    source: finalSource,
  };
}
