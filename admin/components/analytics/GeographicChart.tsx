"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { GeoPoint } from "@/lib/adminAnalytics";

export default function GeographicChart({ data }: { data: GeoPoint[] }) {
  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-white">Dealers by Region</h3>
        <p className="text-xs text-[#64748B] mt-0.5">Top locations by dealer count</p>
      </div>

      {data.length === 0 ? (
        <div className="py-16 text-center text-[#64748B] text-sm">No location data yet.</div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 12, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2a4a" horizontal={false} />
            <XAxis type="number" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
            <YAxis type="category" dataKey="region" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} width={72} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0C1A32", border: "1px solid #1e2a4a", borderRadius: "12px", fontSize: "12px", color: "#fff" }}
              cursor={{ fill: "#1e2a4a", opacity: 0.3 }}
              formatter={(value) => [value, "Dealers"]}
            />
            <Bar dataKey="dealers" fill="#FC5E01" radius={[0, 6, 6, 0]} maxBarSize={22} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}