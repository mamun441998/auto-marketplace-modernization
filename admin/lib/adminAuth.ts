const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
const TOKEN_KEY = "motohave_admin_token";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar_url: string | null;
}

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}
export function setAdminToken(t: string) {
  localStorage.setItem(TOKEN_KEY, t);
}
export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function adminLogin(email: string, password: string): Promise<{ success: boolean; message?: string; user?: AdminUser }> {
  try {
    const res = await fetch(`${API}/admin/login`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok && data?.success && data.token) {
      setAdminToken(data.token);
      return { success: true, user: data.user };
    }
    return { success: false, message: data?.message || data?.errors?.email?.[0] || "Invalid email or password." };
  } catch {
    return { success: false, message: "Network error. Is the API running?" };
  }
}

export async function fetchAdminMe(): Promise<AdminUser | null> {
  const t = getAdminToken();
  if (!t) return null;
  try {
    const res = await fetch(`${API}/admin/me`, {
      headers: { Accept: "application/json", Authorization: `Bearer ${t}` },
    });
    const data = await res.json();
    if (res.ok && data?.success) return data.user;
  } catch {
    /* ignore */
  }
  return null;
}

export async function adminLogout(): Promise<void> {
  const t = getAdminToken();
  if (t) {
    try {
      await fetch(`${API}/admin/logout`, {
        method: "POST",
        headers: { Accept: "application/json", Authorization: `Bearer ${t}` },
      });
    } catch {
      /* ignore */
    }
  }
  clearAdminToken();
}