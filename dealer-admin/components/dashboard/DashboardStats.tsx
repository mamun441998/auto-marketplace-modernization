// dealer-admin/components/dashboard/DashboardStats.tsx
"use client";

import { CarFront, UserPlus, ShoppingBag, TrendingUp } from "lucide-react";
import { dashboardStats } from "@/lib/dealerData";

export default function DashboardStats() {
  const stats = [
    {
      label: "Total Inventory",
      value: dashboardStats.totalInventory.toLocaleString(),
      change: dashboardStats.totalInventoryChange,
      icon: CarFront,
      accent: "text-blue-400 bg-blue-500/10",
    },
    {
      label: "New Leads",
      value: dashboardStats.newLeads.toLocaleString(),
      change: dashboardStats.newLeadsChange,
      icon: UserPlus,
      accent: "text-emerald-400 bg-emerald-500/10",
    },
    {
      label: "Total Sales",
      value: dashboardStats.totalSales.toLocaleString(),
      change: dashboardStats.totalSalesChange,
      icon: ShoppingBag,
      accent: "text-violet-400 bg-violet-500/10",
    },
    {
      label: "Total Revenue",
      value: `$${dashboardStats.totalRevenue.toLocaleString()}`,
      change: dashboardStats.totalRevenueChange,
      icon: TrendingUp,
      accent: "text-[#FC5E01] bg-[#FC5E01]/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
            <div className="flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.accent}`}>
                <Icon size={20} />
              </div>
            </div>
            <p className="mt-3 text-2xl font-extrabold text-white">{stat.value}</p>
            <p className="mt-0.5 text-xs text-[#64748B]">{stat.label}</p>
            <p className="mt-2 text-[11px] font-medium text-emerald-400">
              ↑ {stat.change}% from last week
            </p>
          </div>
        );
      })}
    </div>
  );
}