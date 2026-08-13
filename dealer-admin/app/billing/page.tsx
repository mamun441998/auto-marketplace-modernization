"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Loader2, Crown, Sparkles, Zap, CheckCircle2 } from "lucide-react";
import {
  fetchPlans,
  fetchSubscription,
  startSubscriptionCheckout,
  confirmSubscription,
  type PlanConfig,
  type SubscriptionState,
} from "@/lib/dealerSubscription";

const PLAN_ORDER = ["starter", "professional", "enterprise"];
const PLAN_ICON: Record<string, typeof Zap> = {
  starter: Zap,
  professional: Sparkles,
  enterprise: Crown,
};

function BillingInner() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  const [plans, setPlans] = useState<Record<string, PlanConfig>>({});
  const [sub, setSub] = useState<SubscriptionState | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyPlan, setBusyPlan] = useState<string | null>(null);
  const [confirmMsg, setConfirmMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [p, s] = await Promise.all([fetchPlans(), fetchSubscription()]);
    if (p.success) setPlans(p.plans);
    if (s.success) setSub(s.subscription);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // If we came back from Stripe, verify the payment.
  useEffect(() => {
    if (!sessionId) return;
    setConfirmMsg("Confirming your payment…");
    confirmSubscription(sessionId).then((res) => {
      if (res.success && res.status === "completed") {
        setConfirmMsg("Payment successful — your plan is now active.");
        load();
      } else if (res.success) {
        setConfirmMsg("Payment is still processing. Refresh in a moment.");
      } else {
        setConfirmMsg(res.message || "Could not confirm the payment.");
      }
    });
  }, [sessionId, load]);

  async function subscribe(planKey: string) {
    setBusyPlan(planKey);
    const origin = window.location.origin;
    const res = await startSubscriptionCheckout({
      plan: planKey,
      success_url: `${origin}/billing`,
      cancel_url: `${origin}/billing`,
    });
    if (res.success && res.url) {
      window.location.href = res.url;
      return;
    }
    setBusyPlan(null);
    setConfirmMsg(res.message || "Could not start the checkout.");
  }

  const activePlan = sub?.active_plan;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Billing & Plans</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Manage your MotoHave subscription.
        </p>
      </div>

      {confirmMsg && (
        <div className="rounded-xl border border-[#1e2a4a] bg-[#111B33] px-5 py-3 text-sm text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {confirmMsg}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-[#64748B]">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        <>
          {/* Current status */}
          <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
            <p className="text-xs text-[#64748B] uppercase tracking-wider">Current plan</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="text-xl font-bold text-white capitalize">
                {sub?.plan_config?.name || activePlan || "No active plan"}
              </span>
              {sub?.on_trial && (
                <span className="rounded-full bg-amber-500/15 text-amber-400 px-3 py-1 text-xs font-bold">
                  Trial{sub.trial_days_left != null ? ` · ${sub.trial_days_left} days left` : ""}
                </span>
              )}
              {sub?.status && !sub.on_trial && (
                <span className="rounded-full bg-emerald-500/15 text-emerald-400 px-3 py-1 text-xs font-bold capitalize">
                  {sub.status}
                </span>
              )}
            </div>
            {sub?.subscription_ends_at && (
              <p className="mt-2 text-xs text-[#64748B]">
                Renews / ends on{" "}
                {new Date(sub.subscription_ends_at).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PLAN_ORDER.map((key) => {
              const plan = plans[key];
              if (!plan) return null;
              const Icon = PLAN_ICON[key] || Zap;
              const isCurrent = activePlan === key;

              return (
                <div
                  key={key}
                  className={`rounded-2xl border p-6 flex flex-col ${
                    key === "professional"
                      ? "border-[#FC5E01]/60 bg-[#111B33]"
                      : "border-[#1e2a4a] bg-[#111B33]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-[#FC5E01]/10 flex items-center justify-center text-[#FC5E01]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-white">{plan.name}</span>
                  </div>

                  <div className="mt-4">
                    <span className="text-3xl font-extrabold text-white">
                      ${plan.price}
                    </span>
                    <span className="text-sm text-[#64748B]">/{plan.interval}</span>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm text-[#94A3B8] flex-1">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      {plan.vehicle_listings === null
                        ? "Unlimited vehicle listings"
                        : `${plan.vehicle_listings} vehicle listings`}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      {plan.team_members === null
                        ? "Unlimited team members"
                        : `${plan.team_members} team member${plan.team_members === 1 ? "" : "s"}`}
                    </li>
                    <li className="flex items-center gap-2 capitalize">
                      <Check className="w-4 h-4 text-emerald-400" />
                      {plan.support} support
                    </li>
                  </ul>

                  <button
                    type="button"
                    disabled={isCurrent || busyPlan === key}
                    onClick={() => subscribe(key)}
                    className={`mt-6 flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors ${
                      isCurrent
                        ? "bg-[#0A0F1E] border border-[#1e2a4a] text-[#64748B] cursor-default"
                        : "bg-[#FC5E01] hover:bg-[#E5540A] text-white disabled:opacity-60"
                    }`}
                  >
                    {busyPlan === key && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isCurrent ? "Current Plan" : `Subscribe — $${plan.price}`}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20 text-[#64748B]">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      }
    >
      <BillingInner />
    </Suspense>
  );
}