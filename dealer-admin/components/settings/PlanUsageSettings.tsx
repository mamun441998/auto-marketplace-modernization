// dealer-admin/components/settings/PlanUsageSettings.tsx
"use client";

import { useState } from "react";
import { Zap, Gauge, Check, X } from "lucide-react";
import { planConfigs, getCurrentDealerPlan, PlanTier } from "@/lib/planConfig";
import { inventoryVehicles, teamMembers } from "@/lib/dealerData";

export default function PlanUsageSettings() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const currentPlan = getCurrentDealerPlan();

  const vehicleCount = inventoryVehicles.length;
  const teamCount = teamMembers.length;

  const vehicleLimit = currentPlan.maxVehicleListings;
  const teamLimit = currentPlan.maxTeamMembers;

  const vehiclePct =
    vehicleLimit === "unlimited" ? 0 : Math.min(100, Math.round((vehicleCount / vehicleLimit) * 100));
  const teamPct =
    teamLimit === "unlimited" ? 0 : Math.min(100, Math.round((teamCount / teamLimit) * 100));

  const featureLabels: Record<keyof typeof currentPlan.features, string> = {
    aiPricing: "AI Vehicle Pricing",
    aiDescriptionGenerator: "AI Description Generator",
    autoAuctionAccess: "Auto Auction Access",
    advancedCRM: "Advanced CRM & Sales Pipeline",
    websiteBuilder: "Website Builder",
    marketingCampaigns: "Marketing Campaigns",
    customERPIntegration: "Custom ERP Integration",
    prioritySupport: "Priority 24/7 Support",
    advancedAnalytics: "Advanced Analytics",
    customReportBuilder: "Custom Report Builder",
  };

  const enabledFeatures = (Object.keys(currentPlan.features) as Array<keyof typeof currentPlan.features>).filter(
    (key) => currentPlan.features[key]
  );

  const planPricing: Record<PlanTier, string> = {
    Starter: "$49/mo",
    Professional: "$129/mo",
    Enterprise: "$299/mo",
  };

  const planVehicleLabel: Record<PlanTier, string> = {
    Starter: "50 Vehicles",
    Professional: "500 Vehicles",
    Enterprise: "Unlimited",
  };

  return (
    <div className="space-y-6">
      {/* Current Plan Overview */}
      <div className="bg-[#111B33] border border-[#1e2a4a] rounded-2xl p-6 space-y-6">
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
            Upgrade Plan
          </button>
        </div>

        {/* Current Plan Badge */}
        <div className="rounded-xl border border-[#FC5E01]/30 bg-[#FC5E01]/5 p-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FC5E01]/10 text-[#FC5E01]">
            <Gauge size={20} />
          </div>
          <div>
            <span className="block text-[10px] text-[#64748B] uppercase font-bold tracking-wider">Active Plan</span>
            <span className="text-sm text-white font-bold">{currentPlan.tier} Plan — {planPricing[currentPlan.tier]}</span>
          </div>
        </div>

        {/* Usage Bars */}
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-white">Vehicle Listings</span>
              <span className="text-[#94A3B8] text-xs">
                {vehicleCount} / {vehicleLimit === "unlimited" ? "Unlimited" : vehicleLimit}
              </span>
            </div>
            {vehicleLimit !== "unlimited" ? (
              <div className="h-2 w-full bg-[#0A0F1E] border border-[#1e2a4a] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${vehiclePct >= 80 ? "bg-rose-500" : "bg-[#FC5E01]"}`}
                  style={{ width: `${vehiclePct}%` }}
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
                {teamCount} / {teamLimit === "unlimited" ? "Unlimited" : teamLimit}
              </span>
            </div>
            {teamLimit !== "unlimited" ? (
              <div className="h-2 w-full bg-[#0A0F1E] border border-[#1e2a4a] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${teamPct >= 80 ? "bg-rose-500" : "bg-[#FC5E01]"}`}
                  style={{ width: `${teamPct}%` }}
                />
              </div>
            ) : (
              <p className="text-xs text-emerald-400">✓ Unlimited team members included</p>
            )}
          </div>
        </div>

        {/* Included Features */}
        <div className="border-t border-[#1e2a4a] pt-4">
          <p className="text-xs font-semibold text-[#94A3B8] mb-3">Included Features</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {enabledFeatures.map((key) => (
              <div key={key} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                <Check size={13} className="text-emerald-400 flex-shrink-0" />
                {featureLabels[key]}
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
                <p className="text-xs text-[#64748B] mt-0.5">Upgrade or downgrade anytime, billing is prorated.</p>
              </div>
              <button onClick={() => setShowUpgradeModal(false)} className="text-[#64748B] hover:text-white text-sm font-semibold">
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(Object.keys(planConfigs) as PlanTier[]).map((tierName) => {
                const tier = planConfigs[tierName];
                const isActive = tierName === currentPlan.tier;
                const tierFeatures = (Object.keys(tier.features) as Array<keyof typeof tier.features>).filter(
                  (key) => tier.features[key]
                );

                return (
                  <div
                    key={tierName}
                    className={`border rounded-xl p-5 space-y-4 flex flex-col justify-between ${
                      isActive ? "border-[#FC5E01] bg-[#0A0F1E]" : "border-[#1e2a4a] bg-[#0A0F1E]/40"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">{tierName}</span>
                        {isActive && (
                          <span className="bg-[#FC5E01]/10 text-[#FC5E01] border border-[#FC5E01]/20 rounded px-2 py-0.5 text-[9px] font-bold uppercase">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-xl font-bold text-white">{planPricing[tierName]}</div>
                      <span className="block text-[11px] text-[#94A3B8] font-semibold bg-[#111B33] px-2.5 py-1 rounded border border-[#1e2a4a] w-fit">
                        {planVehicleLabel[tierName]}
                      </span>
                      <ul className="space-y-1.5 pt-2 text-xs text-[#94A3B8]">
                        {tierFeatures.slice(0, 4).map((key) => (
                          <li key={key} className="flex items-center gap-1.5">
                            <Check size={12} className="text-[#FC5E01]" />
                            {featureLabels[key]}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      disabled={isActive}
                      onClick={() => {
                        alert(`Plan change to ${tierName} requested (backend not connected yet)`);
                        setShowUpgradeModal(false);
                      }}
                      className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                        isActive
                          ? "bg-[#111B33] text-[#64748B] border border-[#1e2a4a] cursor-not-allowed"
                          : "bg-[#FC5E01] text-white hover:bg-[#E5540A]"
                      }`}
                    >
                      {isActive ? "Current Plan" : "Switch to This Plan"}
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