// dealer-admin/components/analytics/SalesTrendChart.tsx
"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { monthlySalesData } from "@/lib/dealerData";

export default function SalesTrendChart() {
  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="mb-6">
        <h3 className="text-sm font-bold text-white">Sales & Deals Trend</h3>
        <p className="text-xs text-[#64748B] mt-0.5">Monthly revenue compared to deals closed</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={monthlySalesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2a4a" vertical={false} />
          <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="left"
            stroke="#64748B"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#64748B"
            fontSize={11}
            tickLine={false}
            axisLine={false}
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
          />
          <Legend wrapperStyle={{ fontSize: "12px", color: "#94A3B8" }} />
          <Bar yAxisId="left" dataKey="sales" name="Revenue" fill="#FC5E01" radius={[6, 6, 0, 0]} maxBarSize={40} />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="deals"
            name="Deals Closed"
            stroke="#3B82F6"
            strokeWidth={2.5}
            dot={{ fill: "#3B82F6", r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}