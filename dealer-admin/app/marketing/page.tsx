"use client";

import { useState } from "react";
import { Plus, Lock, TrendingUp } from "lucide-react";
import { hasFeatureAccess, getCurrentDealerPlan } from "@/lib/planConfig";
import CampaignStats from "@/components/marketing/CampaignStats";
import CampaignList from "@/components/marketing/CampaignList";
import CreateCampaignModal from "@/components/marketing/CreateCampaignModal";

export default function MarketingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isFeatureAllowed = hasFeatureAccess("marketingCampaigns");
  const currentPlan = getCurrentDealerPlan();

  if (!isFeatureAllowed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4">
          <Lock size={28} />
        </div>
        <h2 className="text-lg font-bold text-white">Marketing Locked</h2>
        <p className="text-sm text-[#64748B] max-w-sm mt-1.5">
          Your current <span className="text-amber-400 font-semibold">{currentPlan.tier}</span> plan does not include marketing campaigns.
        </p>
        <a href="/settings?tab=usage" className="mt-5 rounded-xl bg-[#FC5E01] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors">
          Upgrade to Professional
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Marketing Campaigns</h1>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Create and manage campaigns to reach more buyers.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#FC5E01] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors"
        >
          <Plus size={16} />
          New Campaign
        </button>
      </div>

      <CampaignStats />

      <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 flex items-start gap-3">
        <TrendingUp size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-semibold text-white">Tip</h4>
          <p className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">
            SMS campaigns tend to get faster responses than email. Consider allocating more budget to SMS for your current SUV inventory.
          </p>
        </div>
      </div>

      <CampaignList />

      <CreateCampaignModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}