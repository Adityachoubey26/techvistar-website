import { adminFetch, getApiBaseUrl, readApiError } from '@/lib/api';
import type { DashboardAnalytics } from '@/types/dashboard';

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export async function getDashboardAnalytics(): Promise<DashboardAnalytics> {
  const response = await adminFetch(`${getApiBaseUrl()}/api/admin/dashboard`);

  if (!response.ok) {
    throw new Error(await readApiError(response, 'Failed to load dashboard analytics'));
  }

  const payload = (await response.json()) as ApiEnvelope<DashboardAnalytics>;
  return payload.data;
}
