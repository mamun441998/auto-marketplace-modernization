"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import apiClient from "@/lib/apiClient";
import { goToDashboard } from "@/lib/goToDashboard";

function VerifyEmailInner() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setInfo("");
    setLoading(true);

    try {
      const res = await apiClient.post("/email/verify", {
        email,
        code: code.trim(),
      });
      const data = res.data;

      if (!data.success || !data.token || !data.user) {
        throw new Error(data.message || "Verification failed.");
      }

      // ✅ real dealer-admin app (:3001)-এ token সহ পাঠাও
      goToDashboard(data.token, data.user);
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Verification failed."
      );
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resending) return;
    setError("");
    setInfo("");
    setResending(true);
    try {
      await apiClient.post("/email/resend", { email });
      setInfo("A new code has been sent to your email.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not resend code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
        <h1 className="text-center text-2xl font-bold text-white">
          Verify your email
        </h1>
        <p className="mt-2 text-center text-sm text-slate-400">
          We sent a 6-digit code to
        </p>
        <p className="mb-6 text-center text-sm font-medium text-orange-400 break-all">
          {email || "your email"}
        </p>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}
        {info && (
          <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-400">
            {info}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            required
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="______"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-2xl tracking-[0.5em] text-white placeholder:text-slate-600 focus:border-orange-500 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Didn’t get the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="font-medium text-orange-400 hover:underline disabled:opacity-50"
          >
            {resending ? "Sending..." : "Resend code"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailInner />
    </Suspense>
  );
}