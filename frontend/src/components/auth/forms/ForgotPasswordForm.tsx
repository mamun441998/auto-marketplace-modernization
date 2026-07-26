"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import apiClient from "@/lib/apiClient";

import { AuthInput } from "../shared/AuthInput";
import { AuthButton } from "../shared/AuthButton";

export const ForgotPasswordForm: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setMessage("");
    setValidationErrors({});

    try {
      const cleanEmail = email.trim().toLowerCase();
      await apiClient.post("/forgot-password", { email: cleanEmail });

      // OTP পাঠানো হয়েছে → reset page-এ email সহ যাও
      router.push(`/reset-password?email=${encodeURIComponent(cleanEmail)}`);
    } catch (error: any) {
      if (error.response?.status === 422) {
        setValidationErrors(error.response.data.errors ?? {});
        setMessage(error.response.data.message ?? "Please correct the highlighted fields.");
      } else {
        setMessage(error.response?.data?.message || error.message || "Unable to send reset code.");
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      {message && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
          {message}
        </div>
      )}

      <div>
        <AuthInput
          label="Email Address"
          type="email"
          required
          autoComplete="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {validationErrors.email && (
          <p className="mt-2 text-sm text-red-500">{validationErrors.email[0]}</p>
        )}
      </div>

      <AuthButton type="submit" disabled={loading}>
        {loading ? "Sending Code..." : "Send Verification Code"}
      </AuthButton>
    </form>
  );
};