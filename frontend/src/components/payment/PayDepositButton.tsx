"use client";

import { useState } from "react";

// Keep this in sync with the backend your app talks to.
const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export default function PayDepositButton({
  vehicleId,
  title,
}: {
  vehicleId: number | string;
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setLoading(true);
    setError(null);

    try {
      const origin = window.location.origin;
      const res = await fetch(`${API}/vehicles/${vehicleId}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          customer_name: name || null,
          customer_email: email || null,
          success_url: `${origin}/payment/success`,
          cancel_url: window.location.href,
        }),
      });

      const data = await res.json();

      if (data.success && data.url) {
        window.location.href = data.url; // redirect to Stripe Checkout
        return;
      }

      setError(data.message || "Could not start the payment.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-[#FC5E01] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors"
      >
        Pay Deposit to Reserve
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900">
              Reserve {title || "this vehicle"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Pay a refundable reservation deposit. You’ll be redirected to a
              secure Stripe checkout page.
            </p>

            {error && (
              <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Your name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FC5E01]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FC5E01]"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={startCheckout}
                disabled={loading}
                className="rounded-lg bg-[#FC5E01] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] disabled:opacity-60"
              >
                {loading ? "Starting…" : "Continue to Payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}