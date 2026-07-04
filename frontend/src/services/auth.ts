// src/services/auth.ts

import apiClient from "@/lib/api";

import type {
  SignInFormValues,
  RegisterFormValues,
} from "@/lib/validations/auth";

const TOKEN_KEY = "motohave_token";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

class AuthService {
  /**
   * Save JWT Token
   */
  private saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Remove JWT Token
   */
  private removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  /**
   * Get Token
   */
  getToken(): string | null {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Is Logged In
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Login
   */
  async signIn(
    data: SignInFormValues
  ): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/login",
      data
    );

    if (response.data.success && response.data.token) {
      this.saveToken(response.data.token);
    }

    return response.data;
  }

  /**
   * Register
   */
  async register(
    data: RegisterFormValues
  ): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/register",
      data
    );

    if (response.data.success && response.data.token) {
      this.saveToken(response.data.token);
    }

    return response.data;
  }

  /**
   * Current User
   */
  async me(): Promise<User> {
    const token = this.getToken();

    if (!token) {
      throw new Error("No authentication token.");
    }

    const response = await apiClient.get<{
      success: boolean;
      user: User;
    }>("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.user;
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    const token = this.getToken();

    if (!token) {
      this.removeToken();
      return;
    }

    try {
      await apiClient.post(
        "/logout",
        {},
        
        
      );
    } finally {
      this.removeToken();
    }
  }
}

export const authService = new AuthService();