"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, getUser } from "@/lib/auth";

export default function DealerDashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Dealer");

  useEffect(() => {
    const token = getToken();
    const user = getUser();

    if (!token) {
      router.replace("/sign-in");
      return;
    }

    if (user?.name) {
      setUserName(user.name);
    }
  }, [router]);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#111827] p-8 text-white shadow-2xl">
      <p className="text-sm uppercase tracking-[0.2em] text-orange-400">Dealer Dashboard</p>
      <h1 className="mt-3 text-3xl font-semibold">Welcome back, {userName}</h1>
      <p className="mt-4 max-w-2xl text-sm text-slate-400">
        You are now authenticated with the Laravel backend. This dashboard is the landing page after successful sign in or registration.
      </p>
    </div>
  );
}
