/**
 * @file sanitizeHtml.ts
 * @description DOMPurify-based HTML sanitization for CMS rich text.
 */

import DOMPurify from 'isomorphic-dompurify';

const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'del',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li',
  'blockquote', 'pre', 'code',
  'a', 'hr',
  'span', 'div',
  'input', 'label', // task list checkbox markup from TipTap
];

const ALLOWED_ATTR = [
  'href', 'target', 'rel', 'class',
  'data-type', 'data-checked',
  'type', 'disabled', 'checked',
];

/**
 * Sanitize CMS HTML for safe storage / render.
 * Plain text (no tags) passes through unchanged.
 */
export function sanitizeRichHtml(html: string | null | undefined): string {
  const raw = typeof html === 'string' ? html : '';
  if (!raw.trim()) return '';

  // ADD_ATTR keeps target/rel even when strict hook configs strip them.
  // ALLOWED_URI_REGEXP ensures http(s)/mailto/tel survive.
  return DOMPurify.sanitize(raw, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: true,
    ADD_ATTR: ['target', 'rel'],
    ALLOWED_URI_REGEXP:
      /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  }).trim();
}

/** True when the string looks like stored HTML (has tags). */
export function looksLikeHtml(value: string | null | undefined): boolean {
  const v = typeof value === 'string' ? value.trim() : '';
  if (!v) return false;
  return /<\/?[a-z][\s\S]*>/i.test(v);
}

/**
 * Convert legacy plain text into minimal safe HTML paragraphs so the editor
 * and public renderer can handle both formats without migrations.
 */
export function plainTextToHtml(text: string): string {
  const raw = text.replace(/\r\n/g, '\n').trim();
  if (!raw) return '';
  if (looksLikeHtml(raw)) return sanitizeRichHtml(raw);

  return raw
    .split(/\n{2,}/)
    .map((block) => {
      const withBreaks = block
        .split('\n')
        .map((line) => escapeHtml(line))
        .join('<br>');
      return `<p>${withBreaks}</p>`;
    })
    .join('');
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Strip tags for character counts / validation emptiness checks.
 */
export function stripHtmlToText(html: string | null | undefined): string {
  const raw = typeof html === 'string' ? html : '';
  if (!raw) return '';
  if (!looksLikeHtml(raw)) return raw.trim();
  return DOMPurify.sanitize(raw, { ALLOWED_TAGS: [] }).replace(/\s+/g, ' ').trim();
}

/**
 * Normalize value before persisting to MongoDB.
 * - Empty editor / whitespace-only → ''
 * - Plain text → unchanged (backward compatible)
 * - HTML → sanitized HTML with link safety attrs enforced
 */
export function normalizeRichContent(value: string | null | undefined): string {
  const raw = typeof value === 'string' ? value : '';
  if (!raw.trim()) return '';

  // TipTap empty doc often serializes as <p></p>
  const text = stripHtmlToText(raw);
  if (!text) return '';

  if (!looksLikeHtml(raw)) return raw;

  let html = sanitizeRichHtml(raw);

  // Ensure every <a> has target + safe rel for public rendering.
  html = html.replace(/<a\b([^>]*)>/gi, (_match, attrs: string) => {
    let next = attrs;

    if (!/\bhref\s*=/i.test(next)) {
      return `<a${attrs}>`;
    }

    if (!/\btarget\s*=/i.test(next)) {
      next += ' target="_blank"';
    } else {
      next = next.replace(/\btarget\s*=\s*(["']).*?\1/i, 'target="_blank"');
    }

    if (!/\brel\s*=/i.test(next)) {
      next += ' rel="noopener noreferrer"';
    } else if (!/noopener/i.test(next)) {
      next = next.replace(
        /\brel\s*=\s*(["'])(.*?)\1/i,
        (_m, q: string, val: string) => `rel=${q}${`${val} noopener noreferrer`.trim()}${q}`
      );
    }

    return `<a${next}>`;
  });

  return html;
}
