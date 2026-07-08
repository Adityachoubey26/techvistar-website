/**
 * @file mediaFallbacks.ts
 * @description Shared CMS image fallback helpers for listing vs detail surfaces.
 */

/** Seed / demo URLs that should yield to a real CMS Cloudinary upload. */
export function isSoftPlaceholderUrl(url: string): boolean {
  const value = url.trim().toLowerCase();
  if (!value) return true;
  return (
    value.includes('images.unsplash.com') ||
    value.includes('placehold.co') ||
    value.includes('via.placeholder.com')
  );
}

/**
 * Prefer a real CMS primary image; soft placeholders (seed Unsplash / placehold.co)
 * yield to a real secondary (e.g. Cloudinary cover). Last resort is finalFallback.
 */
export function preferCmsImage(primary: string | undefined, secondary: string | undefined, finalFallback = ''): string {
  const a = (primary || '').trim();
  const b = (secondary || '').trim();

  if (a && !isSoftPlaceholderUrl(a)) return a;
  if (b && !isSoftPlaceholderUrl(b)) return b;
  if (a) return a;
  if (b) return b;
  return finalFallback;
}
