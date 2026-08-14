"use client";

import { Building2, CarFront, Users, CreditCard } from "lucide-react";
import type { AnalyticsKpis } from "@/lib/adminAnalytics";

export default function AnalyticsStats({ kpis }: { kpis: AnalyticsKpis }) {
  const stats = [
    { label: "Total Dealers", value: kpis.dealers, icon: Building2, accent: "text-[#FC5E01] bg-[#FC5E01]/10" },
    { label: "Vehicles Listed", value: kpis.vehicles, icon: CarFront, accent: "text-blue-400 bg-blue-500/10" },
    { label: "Total Leads", value: kpis.leads, icon: Users, accent: "text-emerald-400 bg-emerald-500/10" },
    { label: "Active Subscriptions", value: kpis.active_subs, icon: CreditCard, accent: "text-violet-400 bg-violet-500/10" },
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
            <p className="mt-3 text-2xl font-extrabold text-white">{stat.value.toLocaleString()}</p>
            <p className="mt-0.5 text-xs text-[#64748B]">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}