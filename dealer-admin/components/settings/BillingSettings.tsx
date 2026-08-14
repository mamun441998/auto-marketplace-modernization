"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Clock, AlertTriangle, Zap } from "lucide-react";
import {
  fetchPlans,
  fetchSubscription,
  PlanConfig,
  SubscriptionStatus,
} from "@/lib/subscription";

const PLAN_ORDER = ["starter", "professional", "enterprise"];

export default function BillingSettings() {
  const [plans, setPlans] = useState<Record<string, PlanConfig>>({});
  const [sub, setSub] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [p, s] = await Promise.all([fetchPlans(), fetchSubscription()]);
        if (p.success) setPlans(p.plans ?? {});
        if (s.success) setSub(s.subscription);
      } catch (err) {
        console.error("Load billing failed:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const router = useRouter();

  const handleChoose = (_planKey: string) => {
    // Real subscription checkout lives on the Billing page
    // (POST /dealer/subscription/checkout → gateway).
    router.push("/billing");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-[#94A3B8]">
        <Loader2 size={20} className="animate-spin mr-2" />
        Loading billing...
      </div>
    );
  }

  const activePlan = sub?.active_plan;
  const usage = sub?.usage;
  const limitLabel = usage?.vehicle_limit == null ? "Unlimited" : usage?.vehicle_limit;

  return (
    <div className="flex flex-col gap-6">
      {/* Current status */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
        <h3 className="text-sm font-bold text-white mb-4">Current Plan</h3>

        {sub?.on_trial ? (
          <div className="flex items-center gap-2 text-[#FC5E01]">
            <Clock size={18} />
            <span className="text-sm font-semibold">
              Free Trial — {sub.trial_days_left} {sub.trial_days_left === 1 ? "day" : "days"} left
              <span className="text-[#94A3B8] font-normal"> (Professional access)</span>
            </span>
          </div>
        ) : sub?.status === "active" ? (
          <div className="flex items-center gap-2 text-emerald-400">
            <Zap size={18} />
            <span className="text-sm font-semibold capitalize">{plans[activePlan ?? ""]?.name || sub.plan} — Active</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-rose-400">
            <AlertTriangle size={18} />
            <span className="text-sm font-semibold">No active plan — trial ended</span>
          </div>
        )}

        {/* Usage bar */}
        {usage && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="text-[#94A3B8]">Vehicle Listings</span>
              <span className="font-semibold text-white">{usage.vehicle_listings} / {limitLabel}</span>
            </div>
            {usage.vehicle_limit != null && (
              <div className="h-2 rounded-full bg-[#0A0F1E] overflow-hidden">
                <div
                  className={`h-full rounded-full ${usage.vehicle_percent >= 90 ? "bg-rose-500" : "bg-[#FC5E01]"}`}
                  style={{ width: `${usage.vehicle_percent}%` }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {PLAN_ORDER.map((key) => {
          const plan = plans[key];
          if (!plan) return null;
          const isCurrent = sub?.status === "active" && activePlan === key;
          const popular = key === "professional";

          return (
            <div
              key={key}
              className={`rounded-2xl border p-6 flex flex-col ${
                popular ? "border-[#FC5E01] bg-[#111B33]" : "border-[#1e2a4a] bg-[#111B33]"
              }`}
            >
              {popular && (
                <span className="self-start mb-2 rounded-full bg-[#FC5E01] px-2.5 py-0.5 text-[10px] font-bold text-white">
                  MOST POPULAR
                </span>
              )}
              <h4 className="text-base font-bold text-white">{plan.name}</h4>
              <p className="mt-2 text-3xl font-extrabold text-white">
                ${plan.price}
                <span className="text-sm font-normal text-[#64748B]">/{plan.interval}</span>
              </p>

              <ul className="mt-4 flex flex-col gap-2 text-xs text-[#94A3B8] flex-1">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> {plan.vehicle_listings == null ? "Unlimited" : plan.vehicle_listings} vehicle listings</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> {plan.team_members == null ? "Unlimited" : plan.team_members} team members</li>
                {plan.features?.website_builder && <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Website builder</li>}
                {plan.features?.advanced_analytics && <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Advanced analytics</li>}
                {plan.features?.ai_pricing && <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> AI vehicle pricing</li>}
                {plan.features?.custom_erp && <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Custom ERP integration</li>}
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> {plan.support} support</li>
              </ul>

              <button
                onClick={() => handleChoose(key)}
                disabled={isCurrent}
                className={`mt-5 w-full rounded-xl py-2.5 text-sm font-semibold transition-colors ${
                  isCurrent
                    ? "bg-[#0A0F1E] border border-[#1e2a4a] text-[#64748B] cursor-default"
                    : "bg-[#FC5E01] text-white hover:bg-[#E5540A]"
                }`}
              >
                {isCurrent ? "Current Plan" : "Choose Plan"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}