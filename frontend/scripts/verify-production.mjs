/**
 * Production preview verification — HTTP routes, assets, bundle checks.
 * Usage: node scripts/verify-production.mjs [baseUrl]
 */
const BASE = process.argv[2] || 'http://127.0.0.1:4173';

const routes = [
  '/',
  '/about',
  '/services',
  '/services/mongodb',
  '/solutions',
  '/solutions/coding-ai-solution',
  '/industries',
  '/industries/healthcare',
  '/work',
  '/work/navigation-route-optimization',
  '/careers',
  '/careers/frontend-developer',
  '/careers/apply/frontend-developer',
  '/contact',
  '/admin/login',
  '/this-route-does-not-exist',
];

const assets = [
  '/favicon.webp',
  '/robots.txt',
  '/sitemap.xml',
  '/assets/index-oZuCyR46.css',
];

let passed = 0;
let failed = 0;

async function check(label, url, test) {
  try {
    const res = await fetch(url, { redirect: 'follow' });
    const ok = await test(res);
    if (ok) {
      passed++;
      console.log(`✅ ${label}`);
      return true;
    }
    failed++;
    console.log(`❌ ${label} — HTTP ${res.status}`);
    return false;
  } catch (err) {
    failed++;
    console.log(`❌ ${label} — ${err.message}`);
    return false;
  }
}

console.log(`\n=== Production Preview Verification (${BASE}) ===\n`);

// Discover main JS from index.html
const indexRes = await fetch(`${BASE}/`);
const indexHtml = await indexRes.text();
const jsMatch = indexHtml.match(/src="(\/assets\/index-[^"]+\.js)"/);
const mainJs = jsMatch?.[1];
if (mainJs) assets.push(mainJs);

console.log('--- Public routes (SPA shell) ---');
for (const route of routes) {
  await check(`Route ${route}`, `${BASE}${route}`, async (res) => {
    if (res.status !== 200) return false;
    const html = await res.text();
    return html.includes('<div id="root">') && html.includes('/assets/index-');
  });
}

console.log('\n--- Static assets ---');
for (const asset of assets) {
  await check(`Asset ${asset}`, `${BASE}${asset}`, (res) => res.status === 200);
}

console.log('\n--- index.html shell ---');
const shellChecks = [
  ['No static duplicate canonical', !indexHtml.includes('rel="canonical"')],
  ['No static duplicate title', !/<title>/i.test(indexHtml)],
  ['Favicon link present', indexHtml.includes('href="/favicon.webp"')],
  ['Root mount present', indexHtml.includes('id="root"')],
  ['Hashed JS bundle', /\/assets\/index-[A-Za-z0-9_-]+\.js/.test(indexHtml)],
  ['Hashed CSS bundle', /\/assets\/index-[A-Za-z0-9_-]+\.css/.test(indexHtml)],
];
for (const [label, ok] of shellChecks) {
  if (ok) { passed++; console.log(`✅ ${label}`); }
  else { failed++; console.log(`❌ ${label}`); }
}

console.log('\n--- Bundle optimization ---');
if (mainJs) {
  const jsRes = await fetch(`${BASE}${mainJs}`);
  const js = await jsRes.text();
  const cssRes = await fetch(`${BASE}/assets/index-oZuCyR46.css`);
  const css = await cssRes.text();

  const jsMinified = !js.includes('\n\n') && js.length > 1000;
  const cssMinified = !css.includes('\n\n') && css.length > 1000;
  const hasHelmet = js.includes('react-helmet') || js.includes('Helmet') || js.includes('PageSeo');
  const hasBuildCanonical = js.includes('techvistar.com');

  for (const [label, ok] of [
    ['Main JS minified (single-line bundle)', jsMinified],
    ['Main CSS minified', cssMinified],
    ['SEO/Helmet code in bundle', hasHelmet || hasBuildCanonical],
    [`JS bundle size ${(js.length / 1024 / 1024).toFixed(2)} MB`, js.length > 0],
  ]) {
    if (ok) { passed++; console.log(`✅ ${label}`); }
    else { failed++; console.log(`❌ ${label}`); }
  }
}

console.log(`\n=== Summary: ${passed} passed, ${failed} failed ===\n`);
process.exit(failed > 0 ? 1 : 0);
