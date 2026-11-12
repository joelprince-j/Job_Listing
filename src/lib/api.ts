// Thin fetch wrapper for the FastAPI backend.

export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/$/, "");

const TOKEN_KEY = "mhd_token";

export type Role = "contributor" | "admin";

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: Role;
  is_active: boolean;
  created_at: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface Task {
  id: string;
  subject: string;
  title: string;
  instructions: string;
  status: "active" | "inactive";
}

export interface AdminStats {
  contributors: number;
  submissions_by_status: Record<string, number>;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export const tokenStore = {
  get(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set(token: string) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      /* storage unavailable (private mode) — session-only login */
    }
  },
  clear() {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
  },
};

/** Turn FastAPI error bodies ({detail: string | [{msg}]}) into a readable message. */
function errorMessage(body: unknown, fallback: string): string {
  if (body && typeof body === "object" && "detail" in body) {
    const detail = (body as { detail: unknown }).detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail) && detail.length) {
      return detail
        .map((d) => (typeof d?.msg === "string" ? d.msg.replace(/^Value error, /, "") : String(d)))
        .join(". ");
    }
  }
  return fallback;
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  const token = tokenStore.get();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, { ...init, headers });
  } catch {
    throw new ApiError(0, "Can't reach the server. If it was idle it may be waking up — try again in a minute.");
  }

  const body = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(res.status, errorMessage(body, `Request failed (${res.status})`));
  return body as T;
}

export const api = {
  register: (data: { email: string; password: string; full_name: string; accept_terms: boolean }) =>
    apiFetch<TokenResponse>("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  login: (data: { email: string; password: string }) =>
    apiFetch<TokenResponse>("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  me: () => apiFetch<User>("/auth/me"),
  tasks: () => apiFetch<Task[]>("/tasks"),
  adminStats: () => apiFetch<AdminStats>("/admin/stats"),
  adminUsers: () => apiFetch<User[]>("/admin/users"),
};
