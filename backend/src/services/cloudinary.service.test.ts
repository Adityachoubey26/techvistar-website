/**
 * @file src/services/cloudinary.service.test.ts
 * @description Ensures deleteImage never throws (API must not crash on Cloudinary failure).
 * Run: npm test
 */

import assert from 'assert';

// Stub required env before any config/cloudinary import
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.PORT = process.env.PORT || '5000';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret-for-unit-tests';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
process.env.CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:8080';
process.env.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'test-cloud';
process.env.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || 'test-key';
process.env.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || 'test-secret';

type DestroyFn = (
  publicId: string,
  options?: Record<string, unknown>
) => Promise<{ result?: string }>;

async function withMockedDestroy(destroyImpl: DestroyFn, run: () => Promise<void>): Promise<void> {
  const cloudinaryModule = await import('@/config/cloudinary');
  const original = cloudinaryModule.cloudinary.uploader.destroy;

  (cloudinaryModule.cloudinary.uploader as { destroy: DestroyFn }).destroy = destroyImpl;

  try {
    await run();
  } finally {
    (cloudinaryModule.cloudinary.uploader as { destroy: typeof original }).destroy = original;
  }
}

async function main(): Promise<void> {
  console.log('\n[cloudinary.service] delete resilience\n');

  const { cloudinaryService } = await import('@/services/cloudinary.service');

  await withMockedDestroy(async () => {
    throw new Error('Cloudinary network down');
  }, async () => {
    const ok = await cloudinaryService.deleteImage('techvistar/uploads/any');
    assert.strictEqual(ok, false, 'deleteImage must return false on failure');
  });
  console.log('  ✓ deleteImage swallows Cloudinary errors');

  await withMockedDestroy(async () => ({ result: 'ok' }), async () => {
    const ok = await cloudinaryService.deleteImage('techvistar/uploads/any');
    assert.strictEqual(ok, true);
  });
  console.log('  ✓ deleteImage returns true on ok');

  await withMockedDestroy(async () => ({ result: 'not found' }), async () => {
    const ok = await cloudinaryService.deleteImage('techvistar/uploads/missing');
    assert.strictEqual(ok, false);
  });
  console.log('  ✓ deleteImage treats not found as non-fatal');

  const empty = await cloudinaryService.deleteImage('');
  assert.strictEqual(empty, false);
  console.log('  ✓ deleteImage no-ops on empty publicId');

  await withMockedDestroy(async () => {
    throw new Error('burst');
  }, async () => {
    await cloudinaryService.deleteImages(['a', 'b', null, '']);
  });
  console.log('  ✓ deleteImages never throws on bulk failure');

  console.log('\nAll cloudinary.service tests passed.\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
