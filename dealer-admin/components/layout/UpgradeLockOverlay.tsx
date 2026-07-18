// dealer-admin/components/layout/UpgradeLockOverlay.tsx
"use client";

import Link from "next/link";
import { Lock, Sparkles } from "lucide-react";
import { PlanTier } from "@/lib/planConfig";

interface UpgradeLockOverlayProps {
  featureName: string;
  requiredPlan: PlanTier;
  description?: string;
}

export default function UpgradeLockOverlay({
  featureName,
  requiredPlan,
  description,
}: UpgradeLockOverlayProps) {
  return (
    <div className="relative min-h-[400px] flex items-center justify-center rounded-2xl border border-[#1e2a4a] bg-[#111B33] overflow-hidden">
      {/* Blurred background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e2a4a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 max-w-md">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FC5E01]/10 border border-[#FC5E01]/20 text-[#FC5E01] mb-5">
          <Lock size={28} />
        </div>

        <h3 className="text-lg font-bold text-white mb-2">
          {featureName} is a {requiredPlan} Feature
        </h3>

        <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
          {description ||
            `Upgrade your plan to ${requiredPlan} to unlock ${featureName.toLowerCase()} and grow your dealership faster.`}
        </p>

        <Link
          href="/settings?tab=billing"
          className="flex items-center gap-2 rounded-xl bg-[#FC5E01] px-6 py-3 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors"
        >
          <Sparkles size={16} />
          Upgrade to {requiredPlan}
        </Link>
      </div>
    </div>
  );
}