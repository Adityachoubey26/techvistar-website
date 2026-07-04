/**
 * @file src/routes/solution.routes.ts
 * @description Route definition for the Solutions CMS module.
 */

import { Router } from 'express';
import {
  getPublicSolutions,
  getPublicSolutionBySlug,
  adminCreateSolution,
  adminUpdateSolution,
  adminDeleteSolution
} from '@/controllers/solution.controller';

const router = Router();

// ─── Public Endpoints ────────────────────────────────────────────────────────
// GET /api/solutions - Returns all active solutions sorted by displayOrder
router.get('/', getPublicSolutions);

// GET /api/solutions/:slug - Returns details of a specific active solution by slug
router.get('/:slug', getPublicSolutionBySlug);

// ─── Administrative CRUD Endpoints ───────────────────────────────────────────
// (Note: To be protected by JWT auth middleware when Phase 2 authentication is implemented)
router.post('/admin', adminCreateSolution);
router.put('/admin/:id', adminUpdateSolution);
router.delete('/admin/:id', adminDeleteSolution);

export default router;
