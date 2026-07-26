export const TOKEN_KEY = "motohave_token";
export const USER_KEY = "motohave_user";

// login/marketing app-এর URL (unauthorized হলে এখানে ফেরত যাবে)
export const FRONTEND_URL = "http://localhost:3000";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser<T = any>(): T | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// :3000 থেকে ?token=...&user=... নিয়ে নিজের localStorage-এ save + URL পরিষ্কার
export function captureAuthFromUrl() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const user = params.get("user");
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    if (user) localStorage.setItem(USER_KEY, user);
    window.history.replaceState({}, "", window.location.pathname);
  }
}