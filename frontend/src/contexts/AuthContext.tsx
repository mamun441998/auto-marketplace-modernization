"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import apiClient from "@/lib/apiClient";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const authenticated = !!user;

  const login = (token: string, userData: User) => {
    localStorage.setItem("motohave_token", token);
    localStorage.setItem("motohave_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    try {
      await apiClient.post("/logout");
    } catch {}

    localStorage.removeItem("motohave_token");
    localStorage.removeItem("motohave_user");
    setUser(null);
    window.location.href = "/sign-in";
  };

  const refreshUser = async () => {
    try {
      const token = localStorage.getItem("motohave_token");

      if (!token) {
        setUser(null);
        return;
      }

      const { data } = await apiClient.get("/user");

      setUser(data.user);
      localStorage.setItem("motohave_user", JSON.stringify(data.user));
    } catch {
      localStorage.removeItem("motohave_token");
      localStorage.removeItem("motohave_user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authenticated,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}