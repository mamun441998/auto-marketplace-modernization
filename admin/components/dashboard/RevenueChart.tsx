// admin/components/dashboard/RevenueChart.tsx
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
import { revenueData } from "../superAdminData";

export default function RevenueChart() {
  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold text-white">Platform Revenue</h3>
          <p className="text-xs text-[#64748B] mt-0.5">Monthly recurring revenue trend</p>
        </div>
        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-400">
          +11.7% MoM
        </span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FC5E01" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#FC5E01" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2a4a" vertical={false} />
          <XAxis
            dataKey="month"
            stroke="#64748B"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#64748B"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0C1A32",
              border: "1px solid #1e2a4a",
              borderRadius: "12px",
              fontSize: "12px",
              color: "#fff",
            }}
            labelStyle={{ color: "#94A3B8" }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#FC5E01"
            strokeWidth={2.5}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}