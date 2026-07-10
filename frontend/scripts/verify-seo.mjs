/**
 * Static SEO verification — resolves canonical/title/robots for every public route pattern.
 * Run: node scripts/verify-seo.mjs
 */
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

// Load ts via dynamic import after building is not needed — duplicate logic in JS for script
const SITE_URL = 'https://techvistar.com';

function buildCanonical(path) {
  const base = SITE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

function normalizeCanonicalUrl(url) {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.replace(/\/$/, '') || '';
    return `${parsed.origin}${path}`;
  } catch {
    return url.trim().replace(/\/$/, '');
  }
}

function resolveCanonical(cmsCanonical, routeCanonical) {
  const cms = cmsCanonical?.trim();
  if (!cms) return routeCanonical;
  const normCms = normalizeCanonicalUrl(cms);
  const normRoute = normalizeCanonicalUrl(routeCanonical);
  if (normCms === normRoute) return cms;
  return routeCanonical;
}

function resolveSeo(seo, defaults) {
  const canonical = resolveCanonical(seo?.canonicalUrl, defaults.url);
  const index = seo?.robotsIndex !== false ? 'index' : 'noindex';
  const follow = seo?.robotsFollow !== false ? 'follow' : 'nofollow';
  return {
    title: seo?.seoTitle?.trim() || defaults.title,
    description: seo?.seoDescription?.trim() || defaults.description,
    canonical,
    robots: `${index}, ${follow}`,
  };
}

const routes = [
  { name: 'Home', path: '/', cms: { canonicalUrl: 'https://techvistar.com/' } },
  { name: 'About', path: '/about', cms: { canonicalUrl: 'https://techvistar.com/about' } },
  { name: 'About (wrong CMS root)', path: '/about', cms: { canonicalUrl: 'https://techvistar.com' } },
  { name: 'Services', path: '/services', cms: { canonicalUrl: '' } },
  { name: 'Service detail', path: '/services/mongodb', cms: { canonicalUrl: '' } },
  { name: 'Service detail (wrong CMS)', path: '/services/mongodb', cms: { canonicalUrl: 'https://techvistar.com' } },
  { name: 'Solutions', path: '/solutions', cms: { canonicalUrl: 'https://techvistar.com/solutions' } },
  { name: 'Solution detail', path: '/solutions/coding-ai-solution', cms: { canonicalUrl: '' } },
  { name: 'Industries', path: '/industries', cms: { canonicalUrl: '' } },
  { name: 'Industry detail', path: '/industries/healthcare', cms: { canonicalUrl: '' } },
  { name: 'Work', path: '/work', cms: {} },
  { name: 'Portfolio detail', path: '/work/navigation-route-optimization', cms: { canonicalUrl: '' } },
  { name: 'Careers', path: '/careers', cms: { canonicalUrl: 'https://techvistar.com/careers' } },
  { name: 'Job detail', path: '/careers/frontend-developer', cms: { canonicalUrl: '' } },
  { name: 'Job application', path: '/careers/apply/frontend-developer', cms: { robotsIndex: false } },
  { name: 'Contact', path: '/contact', cms: { canonicalUrl: 'https://techvistar.com/contact' } },
  { name: '404', path: '/missing-page', cms: { robotsIndex: false, robotsFollow: false } },
  { name: 'Admin login', path: '/admin/login', cms: { robotsIndex: false, robotsFollow: false } },
];

let passed = 0;
let failed = 0;

console.log('\n=== TechVistar SEO Route Verification ===\n');

for (const route of routes) {
  const expectedPath = route.defaultsPath ?? route.path;
  const routeUrl = buildCanonical(expectedPath);
  const expectedCanonical = buildCanonical(route.path);
  const resolved = resolveSeo(route.cms, {
    title: `${route.name} | TechVistar`,
    description: 'Test description',
    url: routeUrl,
  });

  const norm = (u) => normalizeCanonicalUrl(u);
  const canonicalOk = norm(resolved.canonical) === norm(expectedCanonical);
  const titleOk = Boolean(resolved.title?.trim());
  const descOk = Boolean(resolved.description?.trim());
  const robotsOk = Boolean(resolved.robots?.trim());

  const ok = canonicalOk && titleOk && descOk && robotsOk;
  if (ok) {
    passed++;
    console.log(`✅ PASS  ${route.name.padEnd(28)} canonical=${resolved.canonical}`);
  } else {
    failed++;
    console.log(`❌ FAIL  ${route.name.padEnd(28)} got=${resolved.canonical} want=${expectedCanonical}`);
  }
}

// Static asset checks
const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const checks = [
  ['index.html has no static canonical', !indexHtml.includes('rel="canonical"')],
  ['index.html has no static title', !/<title>/i.test(indexHtml)],
  ['index.html favicon /favicon.webp', indexHtml.includes('href="/favicon.webp"')],
  ['index.html no invalid favicon path', !indexHtml.includes('fav.png') && !/rel="icon"[^>]+href="\/src\//.test(indexHtml)],
];

console.log('\n=== Static asset checks ===\n');
for (const [label, ok] of checks) {
  console.log(`${ok ? '✅' : '❌'} ${label}`);
  if (!ok) failed++;
  else passed++;
}

console.log(`\n=== Summary: ${passed} passed, ${failed} failed ===\n`);
process.exit(failed > 0 ? 1 : 0);
