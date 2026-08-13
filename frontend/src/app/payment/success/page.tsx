"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

type Status = "loading" | "completed" | "pending" | "error";

function SuccessInner() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }
    fetch(`${API}/checkout/confirm?session_id=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setStatus(d.status === "completed" ? "completed" : "pending");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [sessionId]);

  return (
    <div className="max-w-md w-full rounded-2xl bg-white p-8 shadow-lg text-center">
      {status === "loading" && (
        <>
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#FC5E01]" />
          <h1 className="text-xl font-bold text-gray-900">Confirming your payment…</h1>
          <p className="mt-1 text-sm text-gray-500">Please wait a moment.</p>
        </>
      )}

      {status === "completed" && (
        <>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-3xl">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Payment successful</h1>
          <p className="mt-2 text-sm text-gray-500">
            Your reservation deposit has been received. The dealer will contact you soon.
          </p>
        </>
      )}

      {status === "pending" && (
        <>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600 text-3xl">
            …
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Payment processing</h1>
          <p className="mt-2 text-sm text-gray-500">
            We haven’t confirmed the payment yet. If you completed it, it may take a
            moment — you can refresh this page.
          </p>
        </>
      )}

      {status === "error" && (
        <>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 text-3xl">
            !
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
          <p className="mt-2 text-sm text-gray-500">
            We couldn’t verify this payment. If you were charged, please contact the dealer.
          </p>
        </>
      )}

      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-[#FC5E01] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A]"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Suspense
        fallback={
          <div className="text-sm text-gray-500">Loading…</div>
        }
      >
        <SuccessInner />
      </Suspense>
    </main>
  );
}