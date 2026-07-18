// dealer-admin/components/dashboard/LeadsSourceChart.tsx
"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { leadsSourceData } from "@/lib/dealerData";

export default function LeadsSourceChart() {
  const total = leadsSourceData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white">Leads Source</h3>
          <p className="text-xs text-[#64748B] mt-0.5">Where your leads come from</p>
        </div>
        <span className="rounded-full border border-[#1e2a4a] bg-[#0A0F1E] px-3 py-1.5 text-xs font-medium text-[#94A3B8]">
          This Week
        </span>
      </div>

      <div className="flex items-center gap-6">
        {/* Donut Chart */}
        <div className="relative flex-shrink-0">
          <ResponsiveContainer width={140} height={140}>
            <PieChart>
              <Pie
                data={leadsSourceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={65}
                paddingAngle={2}
              >
                {leadsSourceData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0C1A32",
                  border: "1px solid #1e2a4a",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "#fff",
                }}
                formatter={(value: number, name: string) => [`${value} (${((value / total) * 100).toFixed(0)}%)`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-lg font-extrabold text-white">{total}</p>
            <p className="text-[9px] text-[#64748B] uppercase tracking-wider">Total</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 flex flex-col gap-2.5">
          {leadsSourceData.map((source) => (
            <div key={source.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: source.color }} />
                <span className="text-[#94A3B8]">{source.name}</span>
              </div>
              <span className="font-semibold text-white">
                {source.value} ({((source.value / total) * 100).toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}