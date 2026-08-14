// dealer-admin/components/dashboard/SalesChart.tsx
"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { salesOverviewData } from "@/lib/dealerData";

export default function SalesChart() {
  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold text-white">Sales Overview</h3>
          <p className="text-xs text-[#64748B] mt-0.5">Vehicle sales trend this week</p>
        </div>
        <span className="rounded-full border border-[#1e2a4a] bg-[#0A0F1E] px-3 py-1.5 text-xs font-medium text-[#94A3B8]">
          This Week
        </span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={salesOverviewData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FC5E01" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#FC5E01" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2a4a" vertical={false} />
          <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0C1A32",
              border: "1px solid #1e2a4a",
              borderRadius: "12px",
              fontSize: "12px",
              color: "#fff",
            }}
            labelStyle={{ color: "#94A3B8" }}
            formatter={(value) => [value, "Sales"]}
          />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#FC5E01"
            strokeWidth={2.5}
            fill="url(#salesGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}