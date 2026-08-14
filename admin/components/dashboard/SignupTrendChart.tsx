"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { SignupPoint } from "@/lib/dashboard";

export default function SignupTrendChart({ data }: { data: SignupPoint[] }) {
  const chart = data.map((d) => ({ label: d.date.slice(5), signups: d.count })); // MM-DD
  const total = data.reduce((s, d) => s + d.count, 0);

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold text-white">New Dealer Signups</h3>
          <p className="text-xs text-[#64748B] mt-0.5">Last 30 days</p>
        </div>
        <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-[10px] font-bold text-blue-400">
          {total} in 30 days
        </span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chart} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2a4a" vertical={false} />
          <XAxis dataKey="label" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} interval={4} />
          <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#0C1A32", border: "1px solid #1e2a4a", borderRadius: "12px", fontSize: "12px", color: "#fff" }}
            labelStyle={{ color: "#94A3B8" }}
            cursor={{ fill: "#1e2a4a", opacity: 0.3 }}
            formatter={(value: number) => [value, "New Dealers"]}
          />
          <Bar dataKey="signups" fill="#3B82F6" radius={[6, 6, 0, 0]} maxBarSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}