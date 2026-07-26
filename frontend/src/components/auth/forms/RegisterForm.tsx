"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import apiClient from "@/lib/apiClient";

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string[]>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: [] }));
    }
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrorMessage("");
    setValidationErrors({});

    if (formData.password !== formData.password_confirmation) {
      setValidationErrors({
        password_confirmation: ["Passwords do not match."],
      });
      setLoading(false);
      return;
    }

    try {
      const selectedPlan = searchParams.get("plan") ?? "starter";

      const response = await apiClient.post("/register", {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        plan: selectedPlan,
      });

      const data = response.data;

      // Backend token দেয় না — শুধু success + "check your email"
      if (!data.success) {
        throw new Error(data.message || "Registration failed.");
      }

      // ✅ Registration সফল → OTP verify page-এ পাঠাও
      router.push(
        `/verify-email?email=${encodeURIComponent(
          formData.email.trim().toLowerCase()
        )}`
      );
    } catch (error: any) {
      console.error(error);

      if (error.response?.status === 422) {
        setValidationErrors(error.response.data.errors ?? {});
        setErrorMessage(
          error.response.data.message ??
            "Please correct the highlighted fields."
        );
      } else {
        setErrorMessage(
          error.response?.data?.message ||
            error.message ||
            "Registration failed."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
          {errorMessage}
        </div>
      )}

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-300">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          required
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="w-full rounded-xl border border-border/80 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-orange-500 focus:outline-none"
        />
        {validationErrors.name && (
          <p className="mt-2 text-sm text-red-500">{validationErrors.name[0]}</p>
        )}
      </div>

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
        {validationErrors.email && (
          <p className="mt-2 text-sm text-red-500">{validationErrors.email[0]}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-300">
          Password
        </label>
        <input
          type="password"
          name="password"
          required
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full rounded-xl border border-border/80 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-orange-500 focus:outline-none"
        />
        {validationErrors.password && (
          <p className="mt-2 text-sm text-red-500">
            {validationErrors.password[0]}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-300">
          Confirm Password
        </label>
        <input
          type="password"
          name="password_confirmation"
          required
          autoComplete="new-password"
          value={formData.password_confirmation}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full rounded-xl border border-border/80 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-orange-500 focus:outline-none"
        />
        {validationErrors.password_confirmation && (
          <p className="mt-2 text-sm text-red-500">
            {validationErrors.password_confirmation[0]}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
};