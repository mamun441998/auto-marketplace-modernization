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
| Token
|--------------------------------------------------------------------------
*/

export const saveToken = (token: string) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(TOKEN_KEY);
};

/*
|--------------------------------------------------------------------------
| User
|--------------------------------------------------------------------------
*/

export const saveUser = (user: AuthUser) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem(USER_KEY);

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const removeUser = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(USER_KEY);
};

/*
|--------------------------------------------------------------------------
| Auth Helpers
|--------------------------------------------------------------------------
*/

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

export const logout = async () => {
  try {
    await apiClient.post("/logout");
  } catch (error) {
    console.warn("Logout API failed:", error);
  }

  removeToken();
  removeUser();

  if (typeof window !== "undefined") {
    window.location.href = "/sign-in";
  }
};