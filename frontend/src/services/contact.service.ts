export interface ContactSubmissionData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceInterested: string;
  message: string;
  budget?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Submits the contact form data to the backend API.
 * Handles fetch request, parses error formats, and throws clean errors.
 * 
 * @param data ContactSubmissionData Form data payload
 */
export async function submitContactForm(data: ContactSubmissionData): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company ?? '',
      serviceInterested: data.serviceInterested,
      message: data.message,
      budget: data.budget ?? '',
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const description = errorData.errors && Array.isArray(errorData.errors)
      ? errorData.errors.map((err: any) => err.message).join(', ')
      : errorData.message || 'Please check your inputs and try again.';

    throw new Error(description);
  }

  return response.json();
}
