/**
 * @file src/services/portfolio.service.ts
 * @description Client service for retrieving Portfolio CMS data from the backend APIs.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Fetches all active portfolio projects from the backend.
 */
export async function getActiveProjects(): Promise<any[]> {
  const response = await fetch(`${API_BASE_URL}/api/portfolio`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch portfolio projects');
  }
  const result = await response.json();
  return result.data || [];
}

/**
 * Fetches details for a single active project by its slug.
 * @param slug Project slug identifier
 */
export async function getProjectBySlug(slug: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/api/portfolio/${slug}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch project details');
  }
  const result = await response.json();
  return result.data;
}
