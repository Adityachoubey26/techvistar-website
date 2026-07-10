import { SeoDefaults, SeoMetadata, SITE_DEFAULTS } from '@/types/seo';

export interface ResolvedSeo {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterSite: string;
  siteName: string;
  keywords: string;
}

export function resolveSeo(
  seo: SeoMetadata | null | undefined,
  defaults: SeoDefaults
): ResolvedSeo {
  const siteName = defaults.siteName || SITE_DEFAULTS.siteName;
  const title = seo?.seoTitle?.trim() || defaults.title;
  const description = seo?.seoDescription?.trim() || defaults.description;
  const canonical = resolveCanonical(seo?.canonicalUrl, defaults.url);
  const image =
    seo?.ogImage?.trim() ||
    seo?.twitterImage?.trim() ||
    defaults.image ||
    '';
  const ogTitle = seo?.ogTitle?.trim() || title;
  const ogDescription = seo?.ogDescription?.trim() || description;
  const twitterTitle = seo?.twitterTitle?.trim() || ogTitle;
  const twitterDescription = seo?.twitterDescription?.trim() || ogDescription;
  const twitterImage = seo?.twitterImage?.trim() || image;

  const index = seo?.robotsIndex !== false ? 'index' : 'noindex';
  const follow = seo?.robotsFollow !== false ? 'follow' : 'nofollow';

  return {
    title,
    description,
    canonical,
    robots: `${index}, ${follow}`,
    ogTitle,
    ogDescription,
    ogImage: image,
    ogUrl: canonical,
    twitterTitle,
    twitterDescription,
    twitterImage,
    twitterSite: defaults.twitterSite?.trim() || '',
    siteName,
    keywords: defaults.keywords?.trim() || '',
  };
}

export function seoFromApi(data: Record<string, unknown> | null | undefined): SeoMetadata {
  if (!data) return {};
  return {
    seoTitle: String(data.seoTitle ?? ''),
    seoDescription: String(data.seoDescription ?? ''),
    canonicalUrl: String(data.canonicalUrl ?? ''),
    ogTitle: String(data.ogTitle ?? ''),
    ogDescription: String(data.ogDescription ?? ''),
    ogImage: String(data.ogImage ?? ''),
    twitterTitle: String(data.twitterTitle ?? ''),
    twitterDescription: String(data.twitterDescription ?? ''),
    twitterImage: String(data.twitterImage ?? ''),
    robotsIndex: data.robotsIndex !== false && data.robotsIndex !== 'false',
    robotsFollow: data.robotsFollow !== false && data.robotsFollow !== 'false',
  };
}

export function buildCanonical(path: string): string {
  const base = SITE_DEFAULTS.siteUrl.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

/** Normalize URL to origin + pathname without trailing slash (except root). */
function normalizeCanonicalUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.replace(/\/$/, '') || '';
    return `${parsed.origin}${path}`;
  } catch {
    return url.trim().replace(/\/$/, '');
  }
}

/**
 * Prefer the route-derived canonical from each page.
 * Honor CMS canonical only when it resolves to the same normalized path as the route.
 */
export function resolveCanonical(
  cmsCanonical: string | undefined,
  routeCanonical: string
): string {
  const cms = cmsCanonical?.trim();
  if (!cms) return routeCanonical;

  const normCms = normalizeCanonicalUrl(cms);
  const normRoute = normalizeCanonicalUrl(routeCanonical);

  if (normCms === normRoute) return cms;

  return routeCanonical;
}
