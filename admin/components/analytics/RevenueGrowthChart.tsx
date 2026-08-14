"use client";

import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import type { GrowthPoint } from "@/lib/adminAnalytics";

export default function RevenueGrowthChart({ data }: { data: GrowthPoint[] }) {
  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="mb-6">
        <h3 className="text-sm font-bold text-white">Platform Growth</h3>
        <p className="text-xs text-[#64748B] mt-0.5">New dealers per month & total dealers (last 6 months)</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2a4a" vertical={false} />
          <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis yAxisId="left" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
          <YAxis yAxisId="right" orientation="right" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#0C1A32", border: "1px solid #1e2a4a", borderRadius: "12px", fontSize: "12px", color: "#fff" }}
            labelStyle={{ color: "#94A3B8" }}
          />
          <Legend wrapperStyle={{ fontSize: "12px", color: "#94A3B8" }} />
          <Bar yAxisId="left" dataKey="dealers" name="New Dealers" fill="#FC5E01" radius={[6, 6, 0, 0]} maxBarSize={36} />
          <Line yAxisId="right" type="monotone" dataKey="cumulative" name="Total Dealers" stroke="#3B82F6" strokeWidth={2.5} dot={{ fill: "#3B82F6", r: 4 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}