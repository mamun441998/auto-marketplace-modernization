// dealer-admin/components/layout/PlanBadge.tsx
"use client";

import { Crown, Zap, Star } from "lucide-react";
import { getCurrentDealerPlan } from "@/lib/planConfig";

const planStyles: Record<string, { icon: typeof Crown; color: string; bg: string }> = {
  Starter: { icon: Star, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  Professional: { icon: Zap, color: "text-[#FC5E01]", bg: "bg-[#FC5E01]/10 border-[#FC5E01]/20" },
  Enterprise: { icon: Crown, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
};

export default function PlanBadge() {
  const currentPlan = getCurrentDealerPlan();
  const style = planStyles[currentPlan.tier];
  const Icon = style.icon;

  return (
    <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${style.bg}`}>
      <Icon size={15} className={style.color} />
      <div>
        <p className={`text-xs font-bold ${style.color}`}>{currentPlan.tier} Plan</p>
      </div>
    </div>
  );
}