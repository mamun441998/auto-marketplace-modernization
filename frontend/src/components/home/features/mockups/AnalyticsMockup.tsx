// features/mockups/AnalyticsMockup.tsx
"use client";

const bars = [40, 65, 50, 80, 60, 90, 75];

export default function AnalyticsMockup() {
  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      {/* KPI Row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-[#0A0A0A] border border-[#262626] p-2">
          <p className="text-[8px] text-[#64748B] uppercase font-bold">Revenue</p>
          <p className="text-xs font-black text-white">$245.8K</p>
        </div>
        <div className="rounded-lg bg-[#0A0A0A] border border-[#262626] p-2">
          <p className="text-[8px] text-[#64748B] uppercase font-bold">Leads</p>
          <p className="text-xs font-black text-white">128</p>
        </div>
        <div className="rounded-lg bg-[#0A0A0A] border border-[#262626] p-2">
          <p className="text-[8px] text-[#64748B] uppercase font-bold">Growth</p>
          <p className="text-xs font-black text-blue-400">+18%</p>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 rounded-lg bg-[#0A0A0A] border border-[#262626] p-3">
        <p className="text-[8px] font-bold text-[#64748B] uppercase mb-2">Sales Trend</p>
        <div className="flex items-end gap-1.5 h-16">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-indigo-500"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="rounded-lg bg-[#0A0A0A] border border-[#262626] p-2.5 flex items-center justify-between">
        <span className="text-[9px] font-semibold text-[#94A3B8]">Data syncing live</span>
        <span className="text-[9px] font-bold text-blue-400">● Real-time</span>
      </div>
    </div>
  );
}