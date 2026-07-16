import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@/utils/ApiResponse';
import { getDashboardSummary } from '@/services/dashboard.service';

export async function adminGetDashboard(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const summary = await getDashboardSummary();
    ApiResponse.success(res, summary, 'Dashboard analytics retrieved successfully');
  } catch (error) {
    next(error);
  }
}
