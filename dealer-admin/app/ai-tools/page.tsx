// dealer-admin/app/ai-tools/page.tsx
"use client";

import { useState } from "react";
import { FileText, Gauge, Lock, Sparkles } from "lucide-react";
import { hasFeatureAccess, getCurrentDealerPlan } from "@/lib/planConfig";
import AIDescriptionGenerator from "@/components/ai-tools/AIDescriptionGenerator";
import AIPricingSuggestion from "@/components/ai-tools/AIPricingSuggestion";
import Link from "next/link"; // 🚀 Next.js Link কম্পোনেন্ট যোগ করা হয়েছে

type AiTab = "descriptions" | "pricing";

export default function AiToolsPage() {
  const [activeTab, setActiveTab] = useState<AiTab>("descriptions");

  // planConfig theke check kora hocche dealer er AI tools feature access ache kina
  const isFeatureAllowed = hasFeatureAccess("aiDescriptionGenerator");
  const currentPlan = getCurrentDealerPlan();

  if (!isFeatureAllowed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400 mb-4">
          <Lock size={28} />
        </div>
        <h2 className="text-lg font-bold text-white">AI Tools Locked</h2>
        <p className="text-sm text-[#64748B] max-w-sm mt-1.5">
          Your current <span className="text-amber-400 font-semibold">{currentPlan.tier}</span> plan doesn&apos;t
          include AI description generation and pricing suggestions.
        </p>
        
        {/* 🚀 এখানে ফিক্স করা হয়েছে: <Link> ট্যাগ সঠিকভাবে বসানো হয়েছে */}
        <Link
          href="/settings?tab=usage"
          className="mt-5 rounded-xl bg-[#FC5E01] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors"
        >
          Upgrade to Professional
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Tools</h1>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Use AI to write vehicle descriptions and get smart pricing suggestions.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl border border-[#1e2a4a] bg-[#111B33] p-1">
          <button
            onClick={() => setActiveTab("descriptions")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === "descriptions" ? "bg-[#FC5E01] text-white" : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <FileText size={15} />
            Description Generator
          </button>
          <button
            onClick={() => setActiveTab("pricing")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === "pricing" ? "bg-[#FC5E01] text-white" : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <Gauge size={15} />
            Pricing Suggestion
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === "descriptions" ? <AIDescriptionGenerator /> : <AIPricingSuggestion />}

      {/* Info Note */}
      <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 flex items-start gap-3">
        <Sparkles size={16} className="text-violet-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-[#94A3B8] leading-relaxed">
          AI suggestions are generated based on your vehicle details and market data. Always review before publishing.
        </p>
      </div>
    </div>
  );
}