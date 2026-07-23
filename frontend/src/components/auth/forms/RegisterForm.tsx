"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import apiClient from "@/lib/apiClient";
import { saveToken, saveUser } from "@/lib/auth";

export const RegisterForm: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    if (
      formData.password !==
      formData.password_confirmation
    ) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await apiClient.post("/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation:
          formData.password_confirmation,
      });

      saveToken(data.token);
      saveUser(data.user);

      router.replace("/dealer-admin/dashboard");
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstKey = Object.keys(errors)[0];

        setErrorMessage(errors[firstKey][0]);
      } else {
        setErrorMessage(
          error.response?.data?.message ??
            "Registration failed."
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
          Full Name
        </label>

        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="w-full rounded-xl border border-border/80 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-300">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="name@company.com"
          className="w-full rounded-xl border border-border/80 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-300">
          Password
        </label>

        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full rounded-xl border border-border/80 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-300">
          Confirm Password
        </label>

        <input
          type="password"
          name="password_confirmation"
          required
          value={formData.password_confirmation}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full rounded-xl border border-border/80 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-orange-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-orange-600 disabled:opacity-50"
      >
        {loading
          ? "Creating account..."
          : "Create Account"}
      </button>
    </form>
  );
}