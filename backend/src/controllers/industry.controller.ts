/**
 * @file src/controllers/industry.controller.ts
 * @description Controller for the Industries CMS module.
 */

import { Request, Response, NextFunction } from 'express';
import { validateIndustryInput } from '@/validators/industry.validator';
import { industryService } from '@/services/industry.service';
import { ApiResponse } from '@/utils/ApiResponse';
import { HTTP_STATUS } from '@/constants';

/**
 * GET /api/industries
 * Returns all active industries ordered by displayOrder.
 */
export async function getPublicIndustries(
  req:  Request,
  res:  Response,
  next: NextFunction
): Promise<void> {
  try {
    const { category } = req.query;
    const industries = await industryService.getActiveIndustries(category ? String(category) : undefined);
    ApiResponse.success(
      res,
      industries,
      'Active industries fetched successfully'
    );
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/industries/:slug
 * Returns a single active industry by its slug.
 */
export async function getPublicIndustryBySlug(
  req:  Request,
  res:  Response,
  next: NextFunction
): Promise<void> {
  try {
    const { slug } = req.params;
    const industry = await industryService.getIndustryBySlug(slug);
    ApiResponse.success(
      res,
      industry,
      'Industry details fetched successfully'
    );
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/admin/industries
 * Creates a new industry.
 */
export async function adminCreateIndustry(
  req:  Request,
  res:  Response,
  next: NextFunction
): Promise<void> {
  try {
    const validatedData = validateIndustryInput(req.body);
    const creatorEmail = (req as any).user?.email || 'Admin';
    const industry = await industryService.createIndustry({
      ...validatedData,
      createdBy: creatorEmail,
      updatedBy: creatorEmail
    });
    ApiResponse.success(
      res,
      industry,
      'Industry created successfully',
      HTTP_STATUS.CREATED
    );
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/admin/industries/:id
 * Updates an existing industry.
 */
export async function adminUpdateIndustry(
  req:  Request,
  res:  Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const validatedData = validateIndustryInput(req.body, true);
    const updaterEmail = (req as any).user?.email || 'Admin';
    const industry = await industryService.updateIndustry(id, {
      ...validatedData,
      updatedBy: updaterEmail
    });
    ApiResponse.success(
      res,
      industry,
      'Industry updated successfully'
    );
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/admin/industries/:id
 * Soft deletes an industry listing.
 */
export async function adminDeleteIndustry(
  req:  Request,
  res:  Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const deleterEmail = (req as any).user?.email || 'Admin';
    await industryService.deleteIndustry(id, deleterEmail);
    ApiResponse.success(res, null, 'Industry soft deleted successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/admin/industries/:id/restore
 * Restores a soft-deleted industry.
 */
export async function adminRestoreIndustry(
  req:  Request,
  res:  Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    await industryService.restoreIndustry(id);
    ApiResponse.success(res, null, 'Industry restored successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/admin/industries/:id/permanent
 * Permanently deletes an industry.
 */
export async function adminPermanentlyDeleteIndustry(
  req:  Request,
  res:  Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    await industryService.permanentlyDeleteIndustry(id);
    ApiResponse.success(res, null, 'Industry permanently deleted');
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/admin/industries/bulk-delete
 * Bulk soft-deletes industries.
 */
export async function adminBulkDeleteIndustries(
  req:  Request,
  res:  Response,
  next: NextFunction
): Promise<void> {
  try {
    const { ids } = req.body;
    const deleterEmail = (req as any).user?.email || 'Admin';
    await industryService.bulkDeleteIndustries(ids, deleterEmail);
    ApiResponse.success(res, null, 'Industries bulk soft-deleted');
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/admin/industries/bulk-restore
 * Bulk restores industries.
 */
export async function adminBulkRestoreIndustries(
  req:  Request,
  res:  Response,
  next: NextFunction
): Promise<void> {
  try {
    const { ids } = req.body;
    await industryService.bulkRestoreIndustries(ids);
    ApiResponse.success(res, null, 'Industries bulk restored');
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/admin/industries/bulk-status
 * Bulk status update.
 */
export async function adminBulkStatusIndustries(
  req:  Request,
  res:  Response,
  next: NextFunction
): Promise<void> {
  try {
    const { ids, status } = req.body;
    const updaterEmail = (req as any).user?.email || 'Admin';
    await industryService.bulkUpdateStatus(ids, status, updaterEmail);
    ApiResponse.success(res, null, 'Industries bulk status updated');
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/industries/admin
 * Returns industries with advanced query filters for administrative management.
 */
export async function adminGetIndustries(
  req:  Request,
  res:  Response,
  next: NextFunction
): Promise<void> {
  try {
    const { page, limit, search, status, category, trash, featured, sortBy, sortOrder } = req.query;
    const result = await industryService.getAllIndustries({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      search: search ? String(search) : undefined,
      status: status ? String(status) : undefined,
      category: category ? String(category) : undefined,
      trash: trash ? String(trash) : undefined,
      featured: featured ? String(featured) : undefined,
      sortBy: sortBy ? String(sortBy) : undefined,
      sortOrder: sortOrder ? (String(sortOrder) as any) : undefined
    });
    
    const paginationMeta = ApiResponse.buildPagination(
      result.pagination.total,
      result.pagination.page,
      result.pagination.limit
    );

    ApiResponse.paginated(
      res,
      result.data,
      paginationMeta,
      'All industries fetched successfully'
    );
  } catch (err) {
    next(err);
  }
}
