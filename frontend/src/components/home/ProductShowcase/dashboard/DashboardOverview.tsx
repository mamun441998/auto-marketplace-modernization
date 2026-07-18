// src/components/home/ProductShowcase/dashboard/DashboardOverview.tsx
"use client";

const kpis = [
  { label: "Total Inventory", value: "245", change: "↑ 12%" },
  { label: "New Leads", value: "128", change: "↑ 18%" },
  { label: "Total Sales", value: "86", change: "↑ 8%" },
  { label: "Total Revenue", value: "$245.8K", change: "↑ 15%" },
];

const chartBars = [30, 45, 55, 48, 65, 72, 90];

const leadSources = [
  { label: "Website", value: "45%", color: "bg-[#FC5E01]" },
  { label: "Facebook", value: "25%", color: "bg-blue-500" },
  { label: "Instagram", value: "20%", color: "bg-violet-500" },
  { label: "Others", value: "10%", color: "bg-emerald-500" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-4 text-white select-none">
      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl bg-[#171717] p-4 border border-[#262626] shadow-sm">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-[#64748B]">{kpi.label}</p>
            <h3 className="mt-1 text-xl font-black tracking-tight text-white">{kpi.value}</h3>
            <p className="text-[10px] font-medium text-[#22C55E]">{kpi.change}</p>
          </div>
        ))}
      </div>

      {/* Main Grid: Chart + Lead Source */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* Sales Overview Chart */}
        <div className="rounded-xl bg-[#171717] p-4 border border-[#262626] shadow-sm">
          <h4 className="text-xs font-bold text-white mb-4">Sales Overview</h4>
          <div className="flex items-end gap-2 h-24">
            {chartBars.map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-[#FC5E01] to-[#FC5E01]/40"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Lead Source Breakdown */}
        <div className="rounded-xl bg-[#171717] p-4 border border-[#262626] shadow-sm">
          <h4 className="text-xs font-bold text-white mb-4">Leads Source</h4>
          <div className="space-y-2.5">
            {leadSources.map((source) => (
              <div key={source.label}>
                <div className="flex justify-between text-[10px] font-bold text-[#94A3B8] mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${source.color}`} />
                    {source.label}
                  </span>
                  <span className="text-white">{source.value}</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#0A0A0A] overflow-hidden">
                  <div className={`h-full rounded-full ${source.color}`} style={{ width: source.value }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl bg-[#171717] p-4 border border-[#262626] shadow-sm">
        <h4 className="text-xs font-bold text-white mb-3">Recent Activity</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-2.5 rounded-lg border border-[#262626] bg-[#0A0A0A]/50">
            <p className="text-[11px] font-bold text-white">Sarah Johnson</p>
            <p className="text-[10px] text-[#64748B]">New lead • Toyota Camry 2023</p>
          </div>
          <div className="p-2.5 rounded-lg border border-[#262626] bg-[#0A0A0A]/50">
            <p className="text-[11px] font-bold text-white">Michael Brown</p>
            <p className="text-[10px] text-[#64748B]">Deal closed • Honda Civic 2022</p>
          </div>
        </div>
      </div>
    </div>
  );
}