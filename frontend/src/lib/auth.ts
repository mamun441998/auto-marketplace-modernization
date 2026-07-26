import apiClient from "@/lib/apiClient";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

const TOKEN_KEY = "motohave_token";
const USER_KEY = "motohave_user";

/*
|--------------------------------------------------------------------------
| Token Helpers
|--------------------------------------------------------------------------
*/

export function saveToken(token: string): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(TOKEN_KEY);
}

/*
|--------------------------------------------------------------------------
| User Helpers
|--------------------------------------------------------------------------
*/

export function saveUser(user: AuthUser): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(USER_KEY);

  if (!stored) return null;

  try {
    return JSON.parse(stored) as AuthUser;
  } catch {
    removeUser();
    return null;
  }
}

export function removeUser(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(USER_KEY);
}

/*
|--------------------------------------------------------------------------
| Session Helpers
|--------------------------------------------------------------------------
*/

export function clearAuth(): void {
  removeToken();
  removeUser();
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

/*
|--------------------------------------------------------------------------
| Login Helper
|--------------------------------------------------------------------------
*/

export function login(token: string, user: AuthUser): void {
  saveToken(token);
  saveUser(user);
}

/*
|--------------------------------------------------------------------------
| Logout Helper
|--------------------------------------------------------------------------
*/

export async function logout(): Promise<void> {
  try {
    const token = getToken();

    if (token) {
      await apiClient.post("/logout");
    }
  } catch (error) {
    console.warn("Logout request failed:", error);
  } finally {
    clearAuth();

    if (typeof window !== "undefined") {
      window.location.replace("/sign-in");
    }
  }
}