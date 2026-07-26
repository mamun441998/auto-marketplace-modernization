"use client";

import { UserPlus, PhoneCall, Target, CheckCircle2 } from "lucide-react";
import { Lead } from "@/lib/lead";

export default function LeadsStats({ leads }: { leads: Lead[] }) {
  const count = (s: string) => leads.filter((l) => l.status === s).length;

  const stats = [
    { label: "New Leads", value: count("new"), icon: UserPlus, accent: "text-blue-400 bg-blue-500/10" },
    { label: "Contacted", value: count("contacted"), icon: PhoneCall, accent: "text-amber-400 bg-amber-500/10" },
    { label: "Qualified", value: count("qualified"), icon: Target, accent: "text-violet-400 bg-violet-500/10" },
    { label: "Closed Won", value: count("closed"), icon: CheckCircle2, accent: "text-emerald-400 bg-emerald-500/10" },
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
          </div>
        );
      })}
    </div>
  );
}