"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";

import apiClient from "@/lib/apiClient";
import { goToDashboard } from "@/lib/goToDashboard";

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
      if (errorMessage) setErrorMessage("");
    },
    [errorMessage]
  );

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setErrorMessage("Email is required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage("Please enter a valid email.");
      return false;
    }
    if (!formData.password) {
      setErrorMessage("Password is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await apiClient.post("/login", {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        remember: formData.remember,
      });

      const data = response.data;

      if (!data.success || !data.token || !data.user) {
        throw new Error(data.message || "Login failed.");
      }

      // ✅ real dealer-admin app (:3001)-এ token সহ পাঠাও
      goToDashboard(data.token, data.user);
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstKey = Object.keys(errors)[0];
        setErrorMessage(errors[firstKey][0]);
      } else {
        setErrorMessage(
          error.response?.data?.message ||
            error.message ||
            "Invalid email or password."
        );
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {errorMessage && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {errorMessage}
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-xs font-semibold uppercase tracking-wider text-slate-300"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@company.com"
          disabled={loading}
          className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-all focus:border-[#FC5E01] focus:outline-none focus:ring-2 focus:ring-[#FC5E01]/20 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-xs font-semibold uppercase tracking-wider text-slate-300"
          >
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs text-orange-400 hover:text-orange-300"
          >
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          type="password"
          name="password"
          required
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          disabled={loading}
          className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-all focus:border-[#FC5E01] focus:outline-none focus:ring-2 focus:ring-[#FC5E01]/20 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
            disabled={loading}
            className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-orange-500"
          />
          Remember me
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center rounded-xl bg-[#FC5E01] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#E05300] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};