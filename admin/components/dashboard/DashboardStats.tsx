"use client";

import { Building2, Users, UserCheck, CarFront, FileText, ClipboardList } from "lucide-react";
import type { AdminTotals } from "@/lib/dashboard";

export default function DashboardStats({ totals }: { totals: AdminTotals }) {
  const stats = [
    {
      label: "Total Dealers",
      value: totals.dealers.toLocaleString(),
      icon: Building2,
      change: `${totals.dealers_active} active · ${totals.dealers_pending} pending`,
      changeColor: "text-[#94A3B8]",
    },
    {
      label: "Active Subscriptions",
      value: totals.active_subs.toLocaleString(),
      icon: UserCheck,
      change: `${totals.trialing} on trial`,
      changeColor: "text-[#94A3B8]",
    },
    {
      label: "Total Users",
      value: totals.users.toLocaleString(),
      icon: Users,
      change: `${totals.staff} admin / staff`,
      changeColor: "text-[#94A3B8]",
    },
    {
      label: "Vehicles Managed",
      value: totals.vehicles.toLocaleString(),
      icon: CarFront,
      change: "Across all dealers",
      changeColor: "text-[#94A3B8]",
    },
    {
      label: "Total Leads",
      value: totals.leads.toLocaleString(),
      icon: FileText,
      change: "All dealers",
      changeColor: "text-[#94A3B8]",
    },
    {
      label: "Dealer Accounts",
      value: totals.dealer_users.toLocaleString(),
      icon: ClipboardList,
      change: "Registered owners",
      changeColor: "text-[#94A3B8]",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FC5E01]/10 text-[#FC5E01]">
              <Icon size={20} />
            </div>
            <p className="mt-3 text-2xl font-extrabold text-white">{stat.value}</p>
            <p className="mt-0.5 text-xs text-[#64748B]">{stat.label}</p>
            <p className={`mt-2 text-[11px] font-medium ${stat.changeColor}`}>{stat.change}</p>
          </div>
        );
      })}
    </div>
  );
}