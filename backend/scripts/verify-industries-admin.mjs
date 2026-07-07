/**
 * End-to-end verification script for Admin Industries CMS API.
 * Run: node scripts/verify-industries-admin.mjs
 */

const BASE = process.env.API_BASE || 'http://localhost:5000';
const EMAIL = process.env.ADMIN_EMAIL || 'admin@techvistar.com';
const PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@1234';

const results = [];

function log(name, pass, detail = '') {
  results.push({ name, pass, detail });
  const icon = pass ? 'PASS' : 'FAIL';
  console.log(`[${icon}] ${name}${detail ? ` — ${detail}` : ''}`);
}

let cookie = '';

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (cookie) headers.Cookie = cookie;
  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }
  return { res, json };
}

async function login() {
  const { res, json } = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  const setCookie = res.headers.get('set-cookie');
  if (setCookie) cookie = setCookie.split(';')[0];
  log('Admin Login', res.ok && json.success, `status ${res.status}`);
  return res.ok;
}

async function main() {
  console.log('\n=== Admin Industries CMS E2E Verification ===\n');

  if (!(await login())) {
    console.error('Cannot continue without auth.');
    process.exit(1);
  }

  // List + pagination
  const list1 = await request('/api/industries/admin?page=1&limit=6');
  const total = list1.json.pagination?.total ?? 0;
  const pageCount = list1.json.data?.length ?? 0;
  log('Pagination (page 1, limit 6)', list1.res.ok && pageCount <= 6 && total >= 10, `returned ${pageCount}, total ${total}`);

  const list2 = await request('/api/industries/admin?page=2&limit=6');
  log('Pagination (page 2)', list2.res.ok && (list2.json.data?.length ?? 0) > 0, `returned ${list2.json.data?.length ?? 0}`);

  // Search
  const search = await request('/api/industries/admin?search=healthcare&limit=100');
  const searchHits = (search.json.data || []).filter((i) => i.slug === 'healthcare');
  log('Search', search.res.ok && searchHits.length === 1, `found ${searchHits.length} for "healthcare"`);

  // Filters
  const statusActive = await request('/api/industries/admin?status=active&limit=100');
  const allActive = (statusActive.json.data || []).every((i) => i.status === 'active');
  log('Filter: status=active', statusActive.res.ok && allActive, `count ${statusActive.json.data?.length ?? 0}`);

  const categoryFintech = await request('/api/industries/admin?category=FinTech&limit=100');
  const fintechHits = (categoryFintech.json.data || []).filter((i) => i.category === 'FinTech');
  log('Filter: category=FinTech', categoryFintech.res.ok && fintechHits.length >= 1, `count ${fintechHits.length}`);

  const featured = await request('/api/industries/admin?featured=true&limit=100');
  const allFeatured = (featured.json.data || []).every((i) => i.featured === true);
  log('Filter: featured=true', featured.res.ok && allFeatured, `count ${featured.json.data?.length ?? 0}`);

  // Create
  const createPayload = {
    title: 'E2E Test Industry',
    slug: 'e2e-test-industry',
    shortDescription: 'Short desc for e2e test industry.',
    fullDescription: 'Full description for automated end-to-end verification of industries CMS.',
    icon: 'Rocket',
    category: 'Industrial',
    overview: 'Overview for e2e test.',
    status: 'draft',
    displayOrder: 99,
    ctaLabel: 'Contact us for e2e test',
    featured: false,
    features: ['Feature A'],
    technologies: ['TypeScript'],
    benefits: ['Benefit A'],
    industries: ['web-development'],
    offerings: ['Offering A'],
    process: [{ step: 1, title: 'Step 1', description: 'First step' }],
    stats: [{ value: '100%', label: 'Test', iconType: 'shield', colorTheme: 'green' }],
  };

  const created = await request('/api/industries/admin', {
    method: 'POST',
    body: JSON.stringify(createPayload),
  });
  const createdId = created.json.data?._id;
  const createdCta = created.json.data?.cta;
  log('Create', created.res.status === 201 && !!createdId, `id=${createdId}, cta="${createdCta}"`);
  log('Create preserves ctaLabel→cta', createdCta === 'Contact us for e2e test', `cta="${createdCta}"`);

  // Duplicate slug
  const dup = await request('/api/industries/admin', {
    method: 'POST',
    body: JSON.stringify({ ...createPayload, title: 'Duplicate Slug Test' }),
  });
  log('Duplicate slug protection', dup.res.status === 409, `status ${dup.res.status}`);

  // Edit + status toggle
  const updated = await request(`/api/industries/admin/${createdId}`, {
    method: 'PUT',
    body: JSON.stringify({ ...createPayload, title: 'E2E Test Industry Updated', status: 'active' }),
  });
  log('Edit', updated.res.ok && updated.json.data?.title === 'E2E Test Industry Updated', updated.json.data?.title);
  log('Status toggle (draft→active)', updated.json.data?.status === 'active', `status=${updated.json.data?.status}`);

  // Public visibility after active
  const publicGet = await request('/api/industries/e2e-test-industry');
  log('Public GET after activate', publicGet.res.ok && publicGet.json.data?.slug === 'e2e-test-industry', `status ${publicGet.res.status}`);

  // Soft delete
  const softDel = await request(`/api/industries/admin/${createdId}`, { method: 'DELETE' });
  log('Soft delete', softDel.res.ok, `status ${softDel.res.status}`);

  const trashList = await request('/api/industries/admin?trash=true&limit=100');
  const inTrash = (trashList.json.data || []).some((i) => i._id === createdId && i.isDeleted === true);
  log('Trash filter shows deleted item', trashList.res.ok && inTrash, `inTrash=${inTrash}`);

  const publicAfterDelete = await request('/api/industries/e2e-test-industry');
  log('Public hidden after soft delete', publicAfterDelete.res.status === 404, `status ${publicAfterDelete.res.status}`);

  // Restore
  const restored = await request(`/api/industries/admin/${createdId}/restore`, { method: 'POST' });
  log('Restore', restored.res.ok, `status ${restored.res.status}`);

  const afterRestore = await request('/api/industries/e2e-test-industry');
  log('Public visible after restore', afterRestore.res.ok, `status ${afterRestore.res.status}`);

  // Bulk status
  await request(`/api/industries/admin/${createdId}`, {
    method: 'PUT',
    body: JSON.stringify({ ...createPayload, title: 'E2E Test Industry Updated', status: 'active' }),
  });
  const bulkStatus = await request('/api/industries/admin/bulk-status', {
    method: 'POST',
    body: JSON.stringify({ ids: [createdId], status: 'draft' }),
  });
  const afterBulk = await request(`/api/industries/admin?search=e2e-test-industry&limit=10`);
  const bulkItem = (afterBulk.json.data || []).find((i) => i._id === createdId);
  log('Bulk status update', bulkStatus.res.ok && bulkItem?.status === 'draft', `status=${bulkItem?.status}`);

  // Permanent delete
  const permDel = await request(`/api/industries/admin/${createdId}/permanent`, { method: 'DELETE' });
  log('Permanent delete', permDel.res.ok, `status ${permDel.res.status}`);

  const gone = await request(`/api/industries/admin?search=e2e-test-industry&limit=10`);
  const stillExists = (gone.json.data || []).some((i) => i._id === createdId);
  log('Gone after permanent delete', gone.res.ok && !stillExists, `stillExists=${stillExists}`);

  // Dashboard-style count (admin list total non-deleted)
  const dashboardCount = await request('/api/industries/admin?page=1&limit=1');
  const cmsTotal = dashboardCount.json.pagination?.total ?? 0;
  log('Admin total count (dashboard-style)', dashboardCount.res.ok && cmsTotal === 10, `total=${cmsTotal}`);

  const passed = results.filter((r) => r.pass).length;
  const failed = results.filter((r) => !r.pass).length;
  console.log(`\n=== Summary: ${passed} passed, ${failed} failed ===\n`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
