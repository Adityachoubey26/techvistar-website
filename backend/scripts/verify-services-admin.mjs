/**
 * End-to-end verification script for Admin Services CMS API.
 * Run: node scripts/verify-services-admin.mjs
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
  console.log('\n=== Admin Services CMS E2E Verification ===\n');

  if (!(await login())) {
    console.error('Cannot continue without auth.');
    process.exit(1);
  }

  const list1 = await request('/api/services/admin?page=1&limit=6');
  const total = list1.json.pagination?.total ?? 0;
  const pageCount = list1.json.data?.length ?? 0;
  log('Pagination (page 1, limit 6)', list1.res.ok && pageCount <= 6 && total >= 5, `returned ${pageCount}, total ${total}`);

  const list2 = await request('/api/services/admin?page=2&limit=6');
  log('Pagination (page 2)', list2.res.ok && (list2.json.data?.length ?? 0) > 0, `returned ${list2.json.data?.length ?? 0}`);

  const search = await request('/api/services/admin?search=web&limit=100');
  const searchHits = (search.json.data || []).filter((s) => /web/i.test(s.title));
  log('Search', search.res.ok && searchHits.length >= 1, `found ${searchHits.length} for "web"`);

  const statusActive = await request('/api/services/admin?status=active&limit=100');
  const allActive = (statusActive.json.data || []).every((s) => s.status === 'active');
  log('Filter: status=active', statusActive.res.ok && allActive, `count ${statusActive.json.data?.length ?? 0}`);

  const categoryDev = await request('/api/services/admin?category=Development&limit=100');
  const devHits = (categoryDev.json.data || []).filter((s) => s.category === 'Development');
  log('Filter: category=Development', categoryDev.res.ok && devHits.length >= 1, `count ${devHits.length}`);

  const featured = await request('/api/services/admin?featured=true&limit=100');
  const allFeatured = (featured.json.data || []).every((s) => s.featured === true);
  log('Filter: featured=true', featured.res.ok && allFeatured, `count ${featured.json.data?.length ?? 0}`);

  const createPayload = {
    title: 'E2E Test Service',
    slug: 'e2e-test-service',
    shortDescription: 'Short desc for e2e test service.',
    fullDescription: 'Full description for automated end-to-end verification of services CMS.',
    icon: 'Rocket',
    category: 'Development',
    overview: 'Overview for e2e test service.',
    status: 'draft',
    displayOrder: 99,
    cta: 'Contact us for e2e test',
    featured: false,
    features: ['Feature A'],
    technologies: ['TypeScript'],
    benefits: ['Benefit A'],
    offerings: ['Offering A', 'Offering B', 'Offering C'],
    process: [{ step: 1, title: 'Step 1', description: 'First step' }],
    stats: [{ value: '100%', label: 'Test', iconType: 'shield', colorTheme: 'green' }],
    coverImage: 'serviceWebDev',
  };

  const created = await request('/api/services/admin', {
    method: 'POST',
    body: JSON.stringify(createPayload),
  });
  const createdId = created.json.data?._id;
  const createdOfferings = created.json.data?.offerings;
  log('Create', created.res.status === 201 && !!createdId, `id=${createdId}`);
  log('Create stores offerings', Array.isArray(createdOfferings) && createdOfferings.length === 3, `count=${createdOfferings?.length ?? 0}`);

  const dup = await request('/api/services/admin', {
    method: 'POST',
    body: JSON.stringify({ ...createPayload, title: 'Duplicate Slug Test' }),
  });
  log('Duplicate slug protection', dup.res.status === 409, `status ${dup.res.status}`);

  const publicWhileDraft = await request('/api/services/e2e-test-service');
  log('Public hidden while draft', publicWhileDraft.res.status === 404, `status ${publicWhileDraft.res.status}`);

  const updated = await request(`/api/services/admin/${createdId}`, {
    method: 'PUT',
    body: JSON.stringify({ ...createPayload, title: 'E2E Test Service Updated', status: 'active' }),
  });
  log('Edit', updated.res.ok && updated.json.data?.title === 'E2E Test Service Updated', updated.json.data?.title);
  log('Status toggle (draft→active)', updated.json.data?.status === 'active', `status=${updated.json.data?.status}`);

  const publicGet = await request('/api/services/e2e-test-service');
  log('Public GET after activate', publicGet.res.ok && publicGet.json.data?.slug === 'e2e-test-service', `status ${publicGet.res.status}`);

  const publicList = await request('/api/services');
  const inPublicList = (publicList.json.data || []).some((s) => s.slug === 'e2e-test-service');
  const listItem = (publicList.json.data || []).find((s) => s.slug === 'e2e-test-service');
  log('Public list includes new service', publicList.res.ok && inPublicList, `inList=${inPublicList}`);
  log('Public list exposes offerings', Array.isArray(listItem?.offerings) && listItem.offerings.length >= 1, `offerings=${listItem?.offerings?.length ?? 'missing'}`);

  const softDel = await request(`/api/services/admin/${createdId}`, { method: 'DELETE' });
  log('Soft delete', softDel.res.ok, `status ${softDel.res.status}`);

  const trashList = await request('/api/services/admin?trash=true&limit=100');
  const inTrash = (trashList.json.data || []).some((s) => s._id === createdId && s.isDeleted === true);
  log('Trash filter shows deleted item', trashList.res.ok && inTrash, `inTrash=${inTrash}`);

  const publicAfterDelete = await request('/api/services/e2e-test-service');
  log('Public hidden after soft delete', publicAfterDelete.res.status === 404, `status ${publicAfterDelete.res.status}`);

  const restored = await request(`/api/services/admin/${createdId}/restore`, { method: 'POST' });
  log('Restore', restored.res.ok, `status ${restored.res.status}`);

  const afterRestore = await request('/api/services/e2e-test-service');
  log('Public visible after restore', afterRestore.res.ok, `status ${afterRestore.res.status}`);

  await request(`/api/services/admin/${createdId}`, {
    method: 'PUT',
    body: JSON.stringify({ ...createPayload, title: 'E2E Test Service Updated', status: 'active' }),
  });
  const bulkStatus = await request('/api/services/admin/bulk-status', {
    method: 'POST',
    body: JSON.stringify({ ids: [createdId], status: 'draft' }),
  });
  const afterBulk = await request('/api/services/admin?search=e2e-test-service&limit=10');
  const bulkItem = (afterBulk.json.data || []).find((s) => s._id === createdId);
  log('Bulk status update', bulkStatus.res.ok && bulkItem?.status === 'draft', `status=${bulkItem?.status}`);

  const permDel = await request(`/api/services/admin/${createdId}/permanent`, { method: 'DELETE' });
  log('Permanent delete', permDel.res.ok, `status ${permDel.res.status}`);

  const gone = await request('/api/services/admin?search=e2e-test-service&limit=10');
  const stillExists = (gone.json.data || []).some((s) => s._id === createdId);
  log('Gone after permanent delete', gone.res.ok && !stillExists, `stillExists=${stillExists}`);

  const publicCount = await request('/api/services');
  const activeCount = (publicCount.json.data || []).length;
  log('Public list supports variable count', publicCount.res.ok && activeCount >= 5, `count=${activeCount}`);

  const passed = results.filter((r) => r.pass).length;
  const failed = results.filter((r) => !r.pass).length;
  console.log(`\n=== Summary: ${passed} passed, ${failed} failed ===\n`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
