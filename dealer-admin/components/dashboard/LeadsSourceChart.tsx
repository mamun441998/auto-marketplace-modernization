"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { fetchLeadStats } from "@/lib/lead";

const SOURCE_META: Record<string, { name: string; color: string }> = {
  website:  { name: "Website",  color: "#3b82f6" },
  whatsapp: { name: "WhatsApp", color: "#22c55e" },
  phone:    { name: "Phone",    color: "#f59e0b" },
  walk_in:  { name: "Walk-in",  color: "#8b5cf6" },
  other:    { name: "Other",    color: "#64748b" },
};

interface SourceDatum {
  name: string;
  value: number;
  color: string;
}

export default function LeadsSourceChart() {
  const [data, setData] = useState<SourceDatum[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchLeadStats();
        if (res.success) {
          const bySource = res.stats.by_source ?? {};
          const rows: SourceDatum[] = Object.entries(bySource).map(([key, value]) => ({
            name: SOURCE_META[key]?.name ?? key,
            value: Number(value),
            color: SOURCE_META[key]?.color ?? "#64748b",
          }));
          setData(rows);
        }
      } catch (err) {
        console.error("Load leads source failed:", err);
      }
    })();
  }, []);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white">Leads Source</h3>
          <p className="text-xs text-[#64748B] mt-0.5">Where your leads come from</p>
        </div>
        <span className="rounded-full border border-[#1e2a4a] bg-[#0A0F1E] px-3 py-1.5 text-xs font-medium text-[#94A3B8]">
          All Time
        </span>
      </div>

      {total === 0 ? (
        <p className="py-14 text-center text-sm text-[#64748B]">No leads yet.</p>
      ) : (
        <div className="flex items-center gap-6">
          {/* Donut */}
          <div className="relative flex-shrink-0">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={42}
                  outerRadius={65}
                  paddingAngle={2}
                >
                  {data.map((entry) => (
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
            {data.map((source) => (
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
      )}
    </div>
  );
}