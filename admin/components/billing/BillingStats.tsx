"use client";

import { DollarSign, Users, Clock, TrendingUp } from "lucide-react";
import type { BillingStatsData } from "@/lib/adminBilling";

export default function BillingStats({ stats }: { stats: BillingStatsData }) {
  const items = [
    { label: "Monthly Recurring Revenue", value: `$${stats.mrr.toLocaleString()}`, icon: DollarSign, accent: "text-[#FC5E01] bg-[#FC5E01]/10" },
    { label: "Active Subscriptions", value: stats.active.toLocaleString(), icon: Users, accent: "text-blue-400 bg-blue-500/10" },
    { label: "On Trial", value: stats.trialing.toLocaleString(), icon: Clock, accent: "text-amber-400 bg-amber-500/10" },
    { label: "Avg. Revenue / Dealer", value: `$${stats.avg.toLocaleString()}`, icon: TrendingUp, accent: "text-emerald-400 bg-emerald-500/10" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.accent}`}>
              <Icon size={20} />
            </div>
            <p className="mt-3 text-2xl font-extrabold text-white">{stat.value}</p>
            <p className="mt-0.5 text-xs text-[#64748B]">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}