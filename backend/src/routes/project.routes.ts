/**
 * @file src/routes/project.routes.ts
 * @description Route mapping for the Portfolio module.
 */

import { Router } from 'express';
import {
  getPublicProjects,
  getPublicProjectBySlug,
  adminCreateProject,
  adminUpdateProject,
  adminDeleteProject,
} from '@/controllers/project.controller';

const router = Router();

// GET /api/portfolio - Returns all active projects
router.get('/', getPublicProjects);

// GET /api/portfolio/:slug - Returns single project details by slug
router.get('/:slug', getPublicProjectBySlug);

// Admin operations (to be JWT gated under authentication phase)
router.post('/admin', adminCreateProject);
router.put('/admin/:id', adminUpdateProject);
router.delete('/admin/:id', adminDeleteProject);

export default router;
