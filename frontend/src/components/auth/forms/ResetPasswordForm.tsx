"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import apiClient from "@/lib/apiClient";

import { AuthInput } from "../shared/AuthInput";
import { PasswordInput } from "../shared/PasswordInput";
import { AuthButton } from "../shared/AuthButton";

export const ResetPasswordForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setMessage("");
    setValidationErrors({});
    setSuccess(false);

    if (!email) {
      setMessage("Missing email. Please start the reset process again.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setValidationErrors({ password_confirmation: ["Passwords do not match."] });
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post("/reset-password", {
        email,
        code: code.trim(),
        password,
        password_confirmation: confirmPassword,
      });

      setSuccess(true);
      setMessage(response.data.message || "Password updated successfully.");

      setTimeout(() => router.replace("/sign-in"), 2000);
    } catch (error: any) {
      if (error.response?.status === 422) {
        setValidationErrors(error.response.data.errors ?? {});
        setMessage(error.response.data.message ?? "Please correct the highlighted fields.");
      } else {
        setMessage(error.response?.data?.message || error.message || "Unable to reset password.");
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      {message && (
        <div
          className={`rounded-xl border p-3 text-sm ${
            success
              ? "border-green-500/20 bg-green-500/10 text-green-500"
              : "border-red-500/20 bg-red-500/10 text-red-500"
          }`}
        >
          {message}
        </div>
      )}

      <div>
        <AuthInput
          label="Verification Code"
          type="text"
          inputMode="numeric"
          maxLength={6}
          required
          placeholder="6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
        />
        {validationErrors.code && (
          <p className="mt-2 text-sm text-red-500">{validationErrors.code[0]}</p>
        )}
      </div>

      <div>
        <PasswordInput
          label="New Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        {validationErrors.password && (
          <p className="mt-2 text-sm text-red-500">{validationErrors.password[0]}</p>
        )}
      </div>

      <div>
        <PasswordInput
          label="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
        />
        {validationErrors.password_confirmation && (
          <p className="mt-2 text-sm text-red-500">
            {validationErrors.password_confirmation[0]}
          </p>
        )}
      </div>

      <AuthButton type="submit" disabled={loading}>
        {loading ? "Updating Password..." : "Update Password"}
      </AuthButton>
    </form>
  );
};