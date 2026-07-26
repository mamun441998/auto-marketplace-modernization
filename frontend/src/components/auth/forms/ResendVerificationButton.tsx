"use client";

import React, { useState } from "react";

import apiClient from "@/lib/apiClient";

import { AuthButton } from "../shared/AuthButton";

export const ResendVerificationButton: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [message, setMessage] = useState("");

  const handleResend = async () => {
    if (loading) return;

    setLoading(true);

    setMessage("");

    setSuccess(false);

    try {
      const response =
        await apiClient.post(
          "/email/verification-notification"
        );

      const data = response.data;

      setSuccess(true);

      setMessage(
        data.message ??
          "Verification email has been sent successfully."
      );
    } catch (error: any) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Unable to send verification email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6">
      <div className="space-y-3">

        <h3 className="text-lg font-semibold text-white">
          Verify Your Email
        </h3>

        <p className="text-sm leading-6 text-slate-400">
          Please verify your email address before
          using all MotoHave features.
          <br />
          If you didn't receive the email,
          click the button below.
        </p>

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

        <AuthButton
          type="button"
          disabled={loading}
          onClick={handleResend}
        >
          {loading
            ? "Sending Verification Email..."
            : "Resend Verification Email"}
        </AuthButton>

      </div>
    </div>
  );
};