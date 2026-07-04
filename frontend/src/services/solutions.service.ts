/**
 * @file src/services/solutions.service.ts
 * @description Client service for retrieving Solutions CMS data from the backend APIs.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Fetches all active solutions from the backend.
 */
export async function getActiveSolutions(): Promise<any[]> {
  const response = await fetch(`${API_BASE_URL}/api/solutions`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch solutions');
  }
  const result = await response.json();
  return result.data || [];
}

/**
 * Fetches details for a single active solution by its slug.
 * @param slug Solution slug identifier
 */
export async function getSolutionBySlug(slug: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/api/solutions/${slug}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch solution details');
  }
  const result = await response.json();
  return result.data;
}
