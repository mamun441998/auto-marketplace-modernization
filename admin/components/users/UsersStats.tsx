"use client";

import { Users, ShieldCheck, UserCog, Building2 } from "lucide-react";
import type { UsersCounts } from "@/lib/adminUsers";

export default function UsersStats({ counts }: { counts: UsersCounts }) {
  const stats = [
    { label: "Total Users", value: counts.total, icon: Users, accent: "text-[#FC5E01] bg-[#FC5E01]/10" },
    { label: "Super Admins", value: counts.super_admin, icon: ShieldCheck, accent: "text-violet-400 bg-violet-500/10" },
    { label: "Admin / Staff", value: counts.admin, icon: UserCog, accent: "text-orange-400 bg-orange-500/10" },
    { label: "Dealer Accounts", value: counts.dealer, icon: Building2, accent: "text-blue-400 bg-blue-500/10" },
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