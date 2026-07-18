// dealer-admin/components/analytics/AnalyticsStats.tsx
"use client";

import { DollarSign, ShoppingBag, Clock, Target } from "lucide-react";
import { analyticsOverview } from "@/lib/dealerData";

export default function AnalyticsStats() {
  const stats = [
    {
      label: "Total Revenue",
      value: `$${analyticsOverview.totalRevenue.toLocaleString()}`,
      change: `+${analyticsOverview.revenueGrowth}%`,
      icon: DollarSign,
      accent: "text-[#FC5E01] bg-[#FC5E01]/10",
    },
    {
      label: "Total Deals Closed",
      value: analyticsOverview.totalDeals.toString(),
      change: "This month",
      icon: ShoppingBag,
      accent: "text-emerald-400 bg-emerald-500/10",
    },
    {
      label: "Avg. Days to Sell",
      value: analyticsOverview.avgDaysToSell.toString(),
      change: "Per vehicle",
      icon: Clock,
      accent: "text-blue-400 bg-blue-500/10",
    },
    {
      label: "Lead Conversion Rate",
      value: `${analyticsOverview.conversionRate}%`,
      change: "This month",
      icon: Target,
      accent: "text-violet-400 bg-violet-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.accent}`}>
              <Icon size={20} />
            </div>
            <p className="mt-3 text-2xl font-extrabold text-white">{stat.value}</p>
            <p className="mt-0.5 text-xs text-[#64748B]">{stat.label}</p>
            <p className="mt-2 text-[11px] font-medium text-emerald-400">{stat.change}</p>
          </div>
        );
      })}
    </div>
  );
}