"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { PlanSlice } from "@/lib/adminAnalytics";

export default function PlanDistributionChart({ data }: { data: PlanSlice[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-white">Plan Distribution</h3>
        <p className="text-xs text-[#64748B] mt-0.5">Dealer accounts by plan tier</p>
      </div>

      {total === 0 ? (
        <div className="py-16 text-center text-[#64748B] text-sm">No plan data yet.</div>
      ) : (
        <>
          <div className="relative">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={65} outerRadius={95} paddingAngle={3}>
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#0C1A32", border: "1px solid #1e2a4a", borderRadius: "12px", fontSize: "12px", color: "#fff" }}
                                    formatter={(value, name) => {
                    const v = Number(value);
                    return [`${v} (${((v / total) * 100).toFixed(0)}%)`, name];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-2xl font-extrabold text-white">{total}</p>
              <p className="text-[10px] text-[#64748B] uppercase tracking-wider">Total</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            {data.map((entry) => (
              <div key={entry.name} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-xs text-[#94A3B8]">{entry.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}