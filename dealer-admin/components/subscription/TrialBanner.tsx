"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, AlertTriangle } from "lucide-react";
import { fetchSubscription, SubscriptionStatus } from "@/lib/subscription";

export default function TrialBanner() {
  const [sub, setSub] = useState<SubscriptionStatus | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchSubscription();
        if (res.success) setSub(res.subscription);
      } catch (err) {
        console.error("Load subscription failed:", err);
      }
    })();
  }, []);

  if (!sub) return null;

  // Active paid plan -> no banner.
  if (sub.status === "active" && !sub.on_trial) return null;

  // Trial ended, no plan -> red "subscribe" banner.
  if (!sub.has_access) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <AlertTriangle size={20} className="text-rose-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-white">Your free trial has ended</p>
            <p className="text-xs text-rose-300">Choose a plan to keep adding vehicles and using MotoHave.</p>
          </div>
        </div>
        <Link href="/settings?tab=billing" className="rounded-xl bg-[#FC5E01] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors text-center">
          Choose a Plan
        </Link>
      </div>
    );
  }

  // On trial -> orange countdown banner.
  if (sub.on_trial) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-[#FC5E01]/30 bg-[#FC5E01]/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <Clock size={20} className="text-[#FC5E01] flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-white">
              {sub.trial_days_left} {sub.trial_days_left === 1 ? "day" : "days"} left in your free trial
            </p>
            <p className="text-xs text-[#94A3B8]">You have full Professional access during the trial.</p>
          </div>
        </div>
        <Link href="/settings?tab=billing" className="rounded-xl border border-[#FC5E01] px-5 py-2.5 text-sm font-semibold text-[#FC5E01] hover:bg-[#FC5E01] hover:text-white transition-colors text-center">
          Upgrade Now
        </Link>
      </div>
    );
  }

  return null;
}