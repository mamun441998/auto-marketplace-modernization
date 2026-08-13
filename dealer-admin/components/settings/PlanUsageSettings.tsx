"use client";

import { useEffect, useState } from "react";
import { Zap, Gauge, Check, Clock, AlertTriangle, Loader2 } from "lucide-react";
import {
  fetchSubscription,
  fetchPlans,
  SubscriptionStatus,
  PlanConfig,
} from "@/lib/subscription";

const FEATURE_LABELS: Record<string, string> = {
  lead_management:    "Lead Management",
  website_builder:    "Website Builder",
  basic_analytics:    "Basic Analytics",
  advanced_analytics: "Advanced Analytics",
  ai_pricing:         "AI Vehicle Pricing",
  auto_auction:       "Auto Auction Access",
  custom_erp:         "Custom ERP Integration",
  api_access:         "API Access",
};

const PLAN_ORDER = ["starter", "professional", "enterprise"];

export default function PlanUsageSettings() {
  const [sub, setSub] = useState<SubscriptionStatus | null>(null);
  const [plans, setPlans] = useState<Record<string, PlanConfig>>({});
  const [loading, setLoading] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [s, p] = await Promise.all([fetchSubscription(), fetchPlans()]);
        if (s.success) setSub(s.subscription);
        if (p.success) setPlans(p.plans ?? {});
      } catch (err) {
        console.error("Load plan usage failed:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-[#94A3B8]">
        <Loader2 size={20} className="animate-spin mr-2" />
        Loading plan...
      </div>
    );
  }

  if (!sub) {
    return <div className="text-sm text-[#94A3B8] py-10 text-center">Unable to load plan info.</div>;
  }

  const planCfg = sub.plan_config;
  const usage = sub.usage;

  const vehicleLimit = usage.vehicle_limit; // null = unlimited
  const teamLimit = planCfg.team_members;   // null = unlimited
  const teamCount = 1;                       // only the owner (team module not built yet)
  const teamPct = teamLimit ? Math.min(100, Math.round((teamCount / teamLimit) * 100)) : 0;

  const enabledFeatures = Object.entries(planCfg.features || {})
    .filter(([, v]) => v)
    .map(([k]) => k);

  const planVehicleLabel = (p: PlanConfig) =>
    p.vehicle_listings == null ? "Unlimited" : `${p.vehicle_listings} Vehicles`;

  return (
    <div className="space-y-6">
      <div className="bg-[#111B33] border border-[#1e2a4a] rounded-2xl p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#1e2a4a] pb-4">
          <div>
            <h3 className="text-sm font-bold text-white">Current Plan & Usage</h3>
            <p className="text-xs text-[#64748B] mt-0.5">Track your plan limits and upgrade anytime.</p>
          </div>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="flex items-center gap-1.5 bg-[#FC5E01] text-white hover:bg-[#E5540A] px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            <Zap size={14} />
            {sub.status === "active" ? "Change Plan" : "Choose Plan"}
          </button>
        </div>

        {/* Status badge */}
        {sub.on_trial ? (
          <div className="rounded-xl border border-[#FC5E01]/30 bg-[#FC5E01]/5 p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FC5E01]/10 text-[#FC5E01]"><Clock size={20} /></div>
            <div>
              <span className="block text-[10px] text-[#64748B] uppercase font-bold tracking-wider">Free Trial</span>
              <span className="text-sm text-white font-bold">
                {sub.trial_days_left} {sub.trial_days_left === 1 ? "day" : "days"} left
                <span className="text-[#94A3B8] font-normal"> · {planCfg.name} access</span>
              </span>
            </div>
          </div>
        ) : sub.status === "active" ? (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400"><Gauge size={20} /></div>
            <div>
              <span className="block text-[10px] text-[#64748B] uppercase font-bold tracking-wider">Active Plan</span>
              <span className="text-sm text-white font-bold">{planCfg.name} Plan — ${planCfg.price}/{planCfg.interval}</span>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400"><AlertTriangle size={20} /></div>
            <div>
              <span className="block text-[10px] text-[#64748B] uppercase font-bold tracking-wider">No Active Plan</span>
              <span className="text-sm text-white font-bold">Your free trial has ended — choose a plan</span>
            </div>
          </div>
        )}

        {/* Usage Bars */}
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-white">Vehicle Listings</span>
              <span className="text-[#94A3B8] text-xs">
                {usage.vehicle_listings} / {vehicleLimit == null ? "Unlimited" : vehicleLimit}
              </span>
            </div>
            {vehicleLimit != null ? (
              <div className="h-2 w-full bg-[#0A0F1E] border border-[#1e2a4a] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${usage.vehicle_percent >= 80 ? "bg-rose-500" : "bg-[#FC5E01]"}`}
                  style={{ width: `${usage.vehicle_percent}%` }}
                />
              </div>
            ) : (
              <p className="text-xs text-emerald-400">✓ Unlimited listings included</p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-white">Team Members</span>
              <span className="text-[#94A3B8] text-xs">
                {teamCount} / {teamLimit == null ? "Unlimited" : teamLimit}
              </span>
            </div>
            {teamLimit != null ? (
              <div className="h-2 w-full bg-[#0A0F1E] border border-[#1e2a4a] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-[#FC5E01] transition-all" style={{ width: `${teamPct}%` }} />
              </div>
            ) : (
              <p className="text-xs text-emerald-400">✓ Unlimited team members included</p>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="border-t border-[#1e2a4a] pt-4">
          <p className="text-xs font-semibold text-[#94A3B8] mb-3">Included Features</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {enabledFeatures.map((key) => (
              <div key={key} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                <Check size={13} className="text-emerald-400 flex-shrink-0" />
                {FEATURE_LABELS[key] || key}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-4xl bg-[#111B33] border border-[#1e2a4a] rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#1e2a4a] pb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Choose Your Plan</h3>
                <p className="text-xs text-[#64748B] mt-0.5">Upgrade or downgrade anytime.</p>
              </div>
              <button onClick={() => setShowUpgradeModal(false)} className="text-[#64748B] hover:text-white text-sm font-semibold">Close</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PLAN_ORDER.map((key) => {
                const tier = plans[key];
                if (!tier) return null;
                const isActive = sub.status === "active" && sub.active_plan === key;
                const feats = Object.entries(tier.features || {}).filter(([, v]) => v).map(([k]) => k);

                return (
                  <div key={key} className={`border rounded-xl p-5 space-y-4 flex flex-col justify-between ${isActive ? "border-[#FC5E01] bg-[#0A0F1E]" : "border-[#1e2a4a] bg-[#0A0F1E]/40"}`}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">{tier.name}</span>
                        {isActive && <span className="bg-[#FC5E01]/10 text-[#FC5E01] border border-[#FC5E01]/20 rounded px-2 py-0.5 text-[9px] font-bold uppercase">Current</span>}
                      </div>
                      <div className="text-xl font-bold text-white">${tier.price}<span className="text-xs font-normal text-[#64748B]">/{tier.interval}</span></div>
                      <span className="block text-[11px] text-[#94A3B8] font-semibold bg-[#111B33] px-2.5 py-1 rounded border border-[#1e2a4a] w-fit">{planVehicleLabel(tier)}</span>
                      <ul className="space-y-1.5 pt-2 text-xs text-[#94A3B8]">
                        {feats.slice(0, 4).map((k) => (
                          <li key={k} className="flex items-center gap-1.5"><Check size={12} className="text-[#FC5E01]" /> {FEATURE_LABELS[k] || k}</li>
                        ))}
                      </ul>
                    </div>
                    <button
                      disabled={isActive}
                      onClick={() => {
                        // 💳 Phase 2: Stripe checkout will start here.
                        alert(`Checkout for "${tier.name}" — payment gateway (Stripe) will be connected later.`);
                        setShowUpgradeModal(false);
                      }}
                      className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-colors ${isActive ? "bg-[#111B33] text-[#64748B] border border-[#1e2a4a] cursor-not-allowed" : "bg-[#FC5E01] text-white hover:bg-[#E5540A]"}`}
                    >
                      {isActive ? "Current Plan" : "Choose This Plan"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}