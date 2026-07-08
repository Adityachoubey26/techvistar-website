const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const ACCESS_TOKEN_KEY = "tv_admin_access_token";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin";
}

interface AdminAuthResponse {
  admin: AdminUser;
  token?: string;
}

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function setAccessToken(token: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

function clearAccessToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers || {}),
    },
    ...init,
  });

  let payload: ApiEnvelope<T> | null = null;
  const rawBody = await response.text();

  if (rawBody) {
    try {
      payload = JSON.parse(rawBody) as ApiEnvelope<T>;
    } catch {
      payload = null;
    }
  }

  if (!response.ok) {
    throw new Error((payload as ApiEnvelope<T> | null)?.message || "Authentication request failed");
  }

  return ((payload?.data ?? payload) as T);
}

export async function getCurrentAdmin() {
  const data = await request<{ admin: AdminUser | null }>("/api/auth/me");
  return data.admin;
}

export async function loginAdmin(credentials: { email: string; password: string }) {
  const data = await request<AdminAuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (data.token) {
    setAccessToken(data.token);
  }

  return data;
}

export async function logoutAdmin() {
  try {
    return await request<{ success: boolean }>("/api/auth/logout", {
      method: "POST",
    });
  } finally {
    clearAccessToken();
  }
}
