// dealer-admin/components/analytics/LeadSourceChart.tsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { leadSourcePerformance } from "@/lib/dealerData";

export default function LeadSourceChart() {
  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="mb-6">
        <h3 className="text-sm font-bold text-white">Lead Source Performance</h3>
        <p className="text-xs text-[#64748B] mt-0.5">Leads received vs converted by source</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={leadSourcePerformance} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2a4a" vertical={false} />
          <XAxis dataKey="source" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
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
            cursor={{ fill: "#1e2a4a", opacity: 0.3 }}
          />
          <Legend wrapperStyle={{ fontSize: "12px", color: "#94A3B8" }} />
          <Bar dataKey="leads" name="Total Leads" fill="#3B82F6" radius={[6, 6, 0, 0]} maxBarSize={32} />
          <Bar dataKey="converted" name="Converted" fill="#FC5E01" radius={[6, 6, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}