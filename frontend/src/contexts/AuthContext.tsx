"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import apiClient from "@/lib/apiClient";

/*
|--------------------------------------------------------------------------
| User Model
|--------------------------------------------------------------------------
*/

export interface User {
  id: number;

  name: string;

  email: string;

  /*
  |--------------------------------------------------------------------------
  | Future Ready Fields
  |--------------------------------------------------------------------------
  */

  role?: string;

  avatar?: string | null;

  phone?: string | null;

  company_name?: string | null;

  dealership_name?: string | null;

  email_verified_at?: string | null;

  subscription_status?: string | null;

  subscription_plan?: string | null;

  trial_ends_at?: string | null;

  created_at?: string;

  updated_at?: string;
}

/*
|--------------------------------------------------------------------------
| Context Interface
|--------------------------------------------------------------------------
*/

interface AuthContextType {
  user: User | null;

  authenticated: boolean;

  loading: boolean;

  initialized: boolean;

  login: (
    token: string,
    user: User
  ) => Promise<void>;

  logout: () => Promise<void>;

  refreshUser: () => Promise<void>;

  initializeAuth: () => Promise<void>;

  updateUser: (
    user: Partial<User>
  ) => void;
}

/*
|--------------------------------------------------------------------------
| Storage Keys
|--------------------------------------------------------------------------
*/

const TOKEN_KEY = "motohave_token";

const USER_KEY = "motohave_user";

/*
|--------------------------------------------------------------------------
| Context
|--------------------------------------------------------------------------
*/

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
*/

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [initialized, setInitialized] =
    useState(false);

  const authenticated = !!user;

  /*
  |--------------------------------------------------------------------------
  | Helpers
  |--------------------------------------------------------------------------
  */

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);

    localStorage.removeItem(USER_KEY);

    setUser(null);
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Initialize
  |--------------------------------------------------------------------------
  */

  const initializeAuth =
    useCallback(async () => {
      const token =
        localStorage.getItem(TOKEN_KEY);

      if (!token) {
        clearSession();

        setLoading(false);

        setInitialized(true);

        return;
      }

      const cachedUser =
        localStorage.getItem(USER_KEY);

      if (cachedUser) {
        try {
          setUser(JSON.parse(cachedUser));
        } catch {
          localStorage.removeItem(USER_KEY);
        }
      }

      try {
        const { data } =
          await apiClient.get("/user");

        setUser(data.user);

        localStorage.setItem(
          USER_KEY,
          JSON.stringify(data.user)
        );
      } catch (error) {
        console.warn(
          "Unable to refresh authenticated user.",
          error
        );

        clearSession();
      } finally {
        setLoading(false);

        setInitialized(true);
      }
    }, [clearSession]);

  /*
  |--------------------------------------------------------------------------
  | Login
  |--------------------------------------------------------------------------
  */

  const login = useCallback(
    async (
      token: string,
      userData: User
    ) => {
      localStorage.setItem(
        TOKEN_KEY,
        token
      );

      localStorage.setItem(
        USER_KEY,
        JSON.stringify(userData)
      );

      setUser(userData);

      try {
        const { data } =
          await apiClient.get("/user");

        setUser(data.user);

        localStorage.setItem(
          USER_KEY,
          JSON.stringify(data.user)
        );
      } catch {
        // Ignore
      }
    },
    []
  );

  /*
  |--------------------------------------------------------------------------
  | Refresh User
  |--------------------------------------------------------------------------
  */

  const refreshUser =
    useCallback(async () => {
      const token =
        localStorage.getItem(TOKEN_KEY);

      if (!token) {
        clearSession();

        return;
      }

      try {
        const { data } =
          await apiClient.get("/user");

        setUser(data.user);

        localStorage.setItem(
          USER_KEY,
          JSON.stringify(data.user)
        );
      } catch (error) {
        console.warn(
          "Refresh user failed.",
          error
        );

        clearSession();
      }
    }, [clearSession]);

  /*
  |--------------------------------------------------------------------------
  | Update User Locally
  |--------------------------------------------------------------------------
  */

  const updateUser = useCallback(
    (newValues: Partial<User>) => {
      setUser((previous) => {
        if (!previous) return previous;

        const updated = {
          ...previous,
          ...newValues,
        };

        localStorage.setItem(
          USER_KEY,
          JSON.stringify(updated)
        );

        return updated;
      });
    },
    []
  );

  /*
  |--------------------------------------------------------------------------
  | Logout
  |--------------------------------------------------------------------------
  */

  const logout = useCallback(async () => {
    try {
      await apiClient.post("/logout");
    } catch (error) {
      console.warn(
        "Logout request failed.",
        error
      );
    } finally {
      clearSession();

      window.location.replace("/sign-in");
    }
  }, [clearSession]);

  /*
  |--------------------------------------------------------------------------
  | Initialize Once
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  /*
  |--------------------------------------------------------------------------
  | Memo Value
  |--------------------------------------------------------------------------
  */

  const value = useMemo(
    () => ({
      user,

      authenticated,

      loading,

      initialized,

      login,

      logout,

      refreshUser,

      initializeAuth,

      updateUser,
    }),
    [
      user,
      authenticated,
      loading,
      initialized,
      login,
      logout,
      refreshUser,
      initializeAuth,
      updateUser,
    ]
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

/*
|--------------------------------------------------------------------------
| Hook
|--------------------------------------------------------------------------
*/

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
}