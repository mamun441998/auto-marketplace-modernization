"use client";

import { useEffect, useState } from "react";
import { DollarSign, CheckCircle2, Clock, RotateCcw } from "lucide-react";
import { fetchTransactions, type TransactionStats } from "@/lib/dealerTransactions";

export default function PaymentsStats() {
  const [data, setData] = useState<TransactionStats>({
    revenue: 0,
    completed: 0,
    pending: 0,
    refunded: 0,
  });

  useEffect(() => {
    fetchTransactions().then((res) => {
      if (res.success) setData(res.stats);
    });
  }, []);

  const stats = [
    {
      label: "Total Revenue",
      value: `$${Number(data.revenue).toLocaleString()}`,
      icon: DollarSign,
      accent: "text-[#FC5E01] bg-[#FC5E01]/10",
    },
    {
      label: "Completed",
      value: data.completed.toString(),
      icon: CheckCircle2,
      accent: "text-emerald-400 bg-emerald-500/10",
    },
    {
      label: "Pending",
      value: data.pending.toString(),
      icon: Clock,
      accent: "text-amber-400 bg-amber-500/10",
    },
    {
      label: "Refunded",
      value: data.refunded.toString(),
      icon: RotateCcw,
      accent: "text-rose-400 bg-rose-500/10",
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
          </div>
        );
      })}
    </div>
  );
}