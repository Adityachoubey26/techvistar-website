import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { resolveSeo } from '@/lib/seoResolve';
import { getPublicPagesConfig } from '@/services/pages.service';
import { mergePagesCmsConfig } from '@/types/pagesCms';
import { SeoDefaults, SeoMetadata } from '@/types/seo';

interface PageSeoProps {
  seo?: SeoMetadata | null;
  defaults: SeoDefaults;
}

export function PageSeo({ seo, defaults }: PageSeoProps) {
  const { data } = useQuery({
    queryKey: ['pages-config'],
    queryFn: getPublicPagesConfig,
    staleTime: 60_000,
  });

  const website = mergePagesCmsConfig(data).websiteSettings;
  const globalSeo = website.seoDefaults;

  const mergedDefaults: SeoDefaults = {
    ...defaults,
    siteName: defaults.siteName || website.companyName,
    image:
      defaults.image ||
      globalSeo.defaultOgImage ||
      website.defaultOgImage ||
      undefined,
    twitterSite: defaults.twitterSite || globalSeo.twitterHandle,
    keywords: defaults.keywords || globalSeo.keywords,
    description: defaults.description || globalSeo.metaDescription,
  };

  const resolved = resolveSeo(seo, mergedDefaults);

  return (
    <Helmet prioritizeSeoTags>
      <title>{resolved.title}</title>
      <meta name="description" content={resolved.description} />
      {resolved.keywords ? <meta name="keywords" content={resolved.keywords} /> : null}
      <meta name="robots" content={resolved.robots} />
      <link rel="canonical" href={resolved.canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={resolved.siteName} />
      <meta property="og:title" content={resolved.ogTitle} />
      <meta property="og:description" content={resolved.ogDescription} />
      <meta property="og:url" content={resolved.ogUrl} />
      {resolved.ogImage ? <meta property="og:image" content={resolved.ogImage} /> : null}

      <meta name="twitter:card" content={resolved.twitterImage ? 'summary_large_image' : 'summary'} />
      {resolved.twitterSite ? <meta name="twitter:site" content={resolved.twitterSite} /> : null}
      <meta name="twitter:title" content={resolved.twitterTitle} />
      <meta name="twitter:description" content={resolved.twitterDescription} />
      {resolved.twitterImage ? <meta name="twitter:image" content={resolved.twitterImage} /> : null}
    </Helmet>
  );
}
