"use client";

import { Globe, ShieldCheck, Clock } from "lucide-react";
import type { DomainStats } from "@/lib/adminDomains";

export default function DomainsStats({ stats }: { stats: DomainStats }) {
  const items = [
    { label: "Total Domains", value: stats.total, icon: Globe, accent: "text-[#FC5E01] bg-[#FC5E01]/10" },
    { label: "Live Sites", value: stats.live, icon: ShieldCheck, accent: "text-emerald-400 bg-emerald-500/10" },
    { label: "Pending Setup", value: stats.pending, icon: Clock, accent: "text-amber-400 bg-amber-500/10" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((stat) => {
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