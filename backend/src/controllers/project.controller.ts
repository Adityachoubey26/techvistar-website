/**
 * @file src/controllers/project.controller.ts
 * @description Controller mapping HTTP endpoints to ProjectService business layer operations.
 */

import { Request, Response, NextFunction } from 'express';
import { validateProjectInput } from '@/validators/project.validator';
import { projectService } from '@/services/project.service';
import { ApiResponse } from '@/utils/ApiResponse';
import { HTTP_STATUS } from '@/constants';

/**
 * GET /api/portfolio
 * Returns all active portfolio projects.
 */
export async function getPublicProjects(
  _req: Request,
  res:  Response,
  next: NextFunction
): Promise<void> {
  try {
    const projects = await projectService.getActiveProjects();
    ApiResponse.success(
      res,
      projects,
      'Portfolio projects fetched successfully'
    );
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/portfolio/:slug
 * Returns details for a single project by slug.
 */
export async function getPublicProjectBySlug(
  req:  Request,
  res:  Response,
  next: NextFunction
): Promise<void> {
  try {
    const { slug } = req.params;
    const project = await projectService.getProjectBySlug(slug);
    ApiResponse.success(
      res,
      project,
      'Project details fetched successfully'
    );
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/portfolio/admin
 * Creates a new project listing. Reserved for future Admin Panel integration.
 */
export async function adminCreateProject(
  req:  Request,
  res:  Response,
  next: NextFunction
): Promise<void> {
  try {
    const validatedData = validateProjectInput(req.body);
    const project = await projectService.createProject(validatedData);
    ApiResponse.success(
      res,
      project,
      'Project listing created successfully',
      HTTP_STATUS.CREATED
    );
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/portfolio/admin/:id
 * Updates an existing project. Reserved for future Admin Panel integration.
 */
export async function adminUpdateProject(
  req:  Request,
  res:  Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const validatedData = validateProjectInput(req.body, true);
    const project = await projectService.updateProject(id, validatedData);
    ApiResponse.success(
      res,
      project,
      'Project updated successfully'
    );
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/portfolio/admin/:id
 * Deletes a project. Reserved for future Admin Panel integration.
 */
export async function adminDeleteProject(
  req:  Request,
  res:  Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    await projectService.deleteProject(id);
    ApiResponse.noContent(res);
  } catch (err) {
    next(err);
  }
}
