"use client";

import { BillingCycle } from "@/types/pricing";

interface PricingToggleProps {
  billingCycle: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
}

export default function PricingToggle({ billingCycle, onChange }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="relative flex items-center rounded-full border border-[#262626] bg-[#171717] p-1.5">
        {/* Monthly Button */}
        <button
          onClick={() => onChange("monthly")}
          className={`relative z-10 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
            billingCycle === "monthly"
              ? "bg-[#FC5E01] text-white"
              : "text-[#94A3B8] hover:text-white"
          }`}
        >
          Monthly
        </button>

        {/* Yearly Button */}
        <button
          onClick={() => onChange("yearly")}
          className={`relative z-10 flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
            billingCycle === "yearly"
              ? "bg-[#FC5E01] text-white"
              : "text-[#94A3B8] hover:text-white"
          }`}
        >
          Yearly
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-bold ${
              billingCycle === "yearly"
                ? "bg-white/20 text-white"
                : "bg-[#22C55E]/10 text-[#22C55E]"
            }`}
          >
            Save 20%
          </span>
        </button>
      </div>
    </div>
  );
}