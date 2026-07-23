"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import apiClient from "@/lib/apiClient";
import { saveToken, saveUser } from "@/lib/auth";

export const LoginForm: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      const { data } = await apiClient.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      saveToken(data.token);
      saveUser(data.user);

      router.replace("/dealer-admin/dashboard");
    } catch (error: any) {
      console.error(error);

      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstKey = Object.keys(errors)[0];

        setErrorMessage(errors[firstKey][0]);
      } else {
        setErrorMessage(
          error.response?.data?.message ??
            "Invalid email or password."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {errorMessage && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
          {errorMessage}
        </div>
      )}

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-300">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@company.com"
          className="w-full rounded-xl border border-border/80 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="block text-xs font-medium uppercase tracking-wider text-slate-300">
            Password
          </label>

          <Link
            href="/forgot-password"
            className="text-xs text-orange-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full rounded-xl border border-border/80 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-orange-500 focus:outline-none"
        />
      </div>

      <div className="flex items-center">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
            className="h-4 w-4 rounded border-border bg-background text-orange-500 focus:ring-orange-500"
          />
          Remember for 30 days
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Signing in..."
          : "Sign In"}
      </button>
    </form>
  );
}