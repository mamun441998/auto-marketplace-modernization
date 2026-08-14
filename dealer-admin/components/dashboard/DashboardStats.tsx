"use client";

import { useEffect, useState } from "react";
import { CarFront, UserPlus, ShoppingBag, TrendingUp } from "lucide-react";
import { fetchAllMyVehicles, Vehicle } from "@/lib/vehicle";
import { fetchMyLeads } from "@/lib/lead";

export default function DashboardStats() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [newLeads, setNewLeads] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const vRes = await fetchAllMyVehicles();
        if (vRes.success) setVehicles(vRes.vehicles ?? []);

        const lRes = await fetchMyLeads({ status: "new", per_page: 1 });
        if (lRes.success) setNewLeads(lRes.meta?.total ?? 0);
      } catch (err) {
        console.error("Load dashboard stats failed:", err);
      }
    })();
  }, []);

  const totalInventory = vehicles.length;
  const soldVehicles = vehicles.filter((v) => v.status === "sold");
  const totalSales = soldVehicles.length;
  const totalRevenue = soldVehicles.reduce((s, v) => s + Number(v.price ?? 0), 0);

  const stats = [
    {
      label: "Total Inventory",
      value: totalInventory.toLocaleString(),
      icon: CarFront,
      accent: "text-blue-400 bg-blue-500/10",
      note: `${vehicles.filter((v) => v.status === "active").length} active`,
    },
    {
      label: "New Leads",
      value: newLeads.toLocaleString(),
      icon: UserPlus,
      accent: "text-emerald-400 bg-emerald-500/10",
      note: "Awaiting contact",
    },
    {
      label: "Total Sales",
      value: totalSales.toLocaleString(),
      icon: ShoppingBag,
      accent: "text-violet-400 bg-violet-500/10",
      note: "Sold vehicles",
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      accent: "text-[#FC5E01] bg-[#FC5E01]/10",
      note: "From sold vehicles",
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
            <p className="mt-2 text-[11px] font-medium text-[#64748B]">{stat.note}</p>
          </div>
        );
      })}
    </div>
  );
}