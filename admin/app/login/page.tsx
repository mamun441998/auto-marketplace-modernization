"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2 } from "lucide-react";
import { adminLogin } from "@/lib/adminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await adminLogin(email.trim(), password);
    if (res.success) {
      router.replace("/");
    } else {
      setError(res.message || "Login failed.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1E] px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FC5E01]/10 text-[#FC5E01]">
            <ShieldCheck size={26} />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="mt-1 text-sm text-[#94A3B8]">Sign in to manage MotoHave.</p>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6 space-y-4">
          {error && (
            <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@motohave.com"
              className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#FC5E01] py-3 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}