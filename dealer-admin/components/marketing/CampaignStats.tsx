"use client";

import { Megaphone, Users, Mail, ClickUp, ArrowUpRight, TrendingUp } from "lucide-react";

export default function CampaignStats() {
  // Mock Production Marketing Analytics Matrix
  const stats = [
    {
      label: "Active Campaigns",
      value: "4",
      change: "+1 this month",
      icon: Megaphone,
      color: "text-[#FC5E01] bg-[#FC5E01]/10 border-[#FC5E01]/20",
    },
    {
      label: "Total Audience Reach",
      value: "12,450",
      change: "+14.2%",
      icon: Users,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "Avg. Open Rate",
      value: "24.8%",
      change: "+2.3% vs industry",
      icon: Mail,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Conversion CTR",
      value: "5.2%",
      change: "+1.1%",
      icon: TrendingUp,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
                {stat.label}
              </span>
              <div className={`p-2 rounded-xl border ${stat.color}`}>
                <Icon size={16} />
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-2xl font-black text-white tracking-tight">{stat.value}</h3>
              <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
                <span>{stat.change}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}