/**
 * @file src/services/project.service.ts
 * @description Service layer managing Project database CRUD operations.
 */

import { ProjectModel, IProject } from '@/models/Project';
import { ApiError } from '@/utils/ApiError';
import { logger } from '@/utils/logger';

export class ProjectService {
  /**
   * Creates a new Project portfolio item.
   */
  async createProject(data: Partial<IProject>): Promise<IProject> {
    logger.info('[ProjectService] Creating new project', { title: data.title });

    let slug = data.slug;
    if (!slug && data.title) {
      slug = data.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    }

    if (slug) {
      const existing = await ProjectModel.findOne({ slug });
      if (existing) {
        throw ApiError.conflict(`A project with slug "${slug}" already exists.`);
      }
    }

    const project = new ProjectModel({ ...data, slug });
    await project.save();

    logger.info('[ProjectService] Project created successfully', { id: project._id, slug: project.slug });
    return project;
  }

  /**
   * Updates an existing Project.
   */
  async updateProject(id: string, data: Partial<IProject>): Promise<IProject> {
    logger.info('[ProjectService] Updating project', { id });

    if (data.slug) {
      const existing = await ProjectModel.findOne({ slug: data.slug, _id: { $ne: id } });
      if (existing) {
        throw ApiError.conflict(`A project with slug "${data.slug}" already exists.`);
      }
    }

    const project = await ProjectModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!project) {
      throw ApiError.notFound('Project not found');
    }

    logger.info('[ProjectService] Project updated successfully', { id: project._id });
    return project;
  }

  /**
   * Deletes a Project.
   */
  async deleteProject(id: string): Promise<void> {
    logger.info('[ProjectService] Deleting project', { id });
    const result = await ProjectModel.findByIdAndDelete(id);
    if (!result) {
      throw ApiError.notFound('Project not found');
    }
    logger.info('[ProjectService] Project deleted successfully', { id });
  }

  /**
   * Retrieves all projects sorted by displayOrder.
   * Filters out drafts unless admin updates are implemented.
   */
  async getActiveProjects(): Promise<IProject[]> {
    logger.info('[ProjectService] Retrieving all active projects');
    return ProjectModel.find()
      .sort({ displayOrder: 1, date: -1 });
  }

  /**
   * Retrieves a single active project by its slug.
   */
  async getProjectBySlug(slug: string): Promise<IProject> {
    logger.info('[ProjectService] Retrieving project by slug', { slug });
    const project = await ProjectModel.findOne({ slug });
    if (!project) {
      throw ApiError.notFound(`Project not found for slug "${slug}"`);
    }
    return project;
  }
}

export const projectService = new ProjectService();
