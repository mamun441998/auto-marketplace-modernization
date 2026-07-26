"use client";

import {
  Car,
  Users,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

export default function DealerDashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Inventory",
      value: "0",
      icon: Car,
      color: "bg-orange-500/10 text-orange-400",
    },
    {
      title: "New Leads",
      value: "0",
      icon: Users,
      color: "bg-blue-500/10 text-blue-400",
    },
    {
      title: "Vehicle Sold",
      value: "0",
      icon: TrendingUp,
      color: "bg-green-500/10 text-green-400",
    },
    {
      title: "Revenue",
      value: "$0",
      icon: DollarSign,
      color: "bg-purple-500/10 text-purple-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}

      <section className="rounded-3xl border border-white/10 bg-[#111827] p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#FC5E01]">
              Dealer Dashboard
            </p>

            <h1 className="mt-3 text-3xl font-bold text-white">
              Welcome back, {user?.name}
            </h1>

            <p className="mt-4 max-w-2xl text-slate-400">
              Manage your dealership, inventory, customers, website,
              marketing and analytics from one dashboard.
            </p>
          </div>

          <div className="hidden lg:flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FC5E01]/10">
            <ArrowUpRight className="h-10 w-10 text-[#FC5E01]" />
          </div>
        </div>
      </section>

      {/* Statistics */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-lg transition-all hover:border-[#FC5E01]/40"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    {item.title}
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-white">
                    {item.value}
                  </h3>
                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${item.color}`}
                >
                  <Icon className="h-7 w-7" />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Placeholder Sections */}

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
          <h2 className="text-lg font-semibold text-white">
            Recent Leads
          </h2>

          <p className="mt-4 text-sm text-slate-400">
            No leads found.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
          <h2 className="text-lg font-semibold text-white">
            Recent Inventory
          </h2>

          <p className="mt-4 text-sm text-slate-400">
            No vehicles available.
          </p>
        </div>
      </section>
    </div>
  );
}