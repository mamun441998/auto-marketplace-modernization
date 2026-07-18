"use client";

import { TrendingUp, DollarSign, Calendar } from "lucide-react";

export default function RevenueChart() {
  const months = [
    { label: "Jan", revenue: 42000, height: "h-[40%]" },
    { label: "Feb", revenue: 58000, height: "h-[55%]" },
    { label: "Mar", revenue: 73000, height: "h-[70%]" },
    { label: "Apr", revenue: 69000, height: "h-[65%]" },
    { label: "May", revenue: 95000, height: "h-[85%]" },
    { label: "Jun", revenue: 142380, height: "h-[100%]" },
  ];

  return (
    <div className="bg-[#111B33] border border-[#1e2a4a] rounded-2xl p-5 flex flex-col justify-between">
      <div className="flex items-start justify-between border-b border-[#1e2a4a]/60 pb-3 mb-4">
        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-wider">Gross Revenue Pipeline</h4>
          <p className="text-[10px] text-[#64748B] mt-0.5">Rolling 6-month gross clearance settlement tracking.</p>
        </div>
        <div className="flex items-center gap-1 bg-[#0A0F1E] border border-[#1e2a4a] px-2.5 py-1 rounded-lg text-[10px] font-bold text-emerald-400">
          <TrendingUp size={11} />
          <span>+34.2% YoY</span>
        </div>
      </div>

      {/* Bar Chart Visual Node */}
      <div className="h-32 flex items-end justify-between gap-2 pt-2 px-1">
        {months.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
            {/* Tooltip on Hover */}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#0A0F1E] border border-[#1e2a4a] text-white font-mono text-[9px] font-black px-1.5 py-0.5 rounded absolute mb-14 shadow-xl pointer-events-none">
              ${(item.revenue / 1000).toFixed(1)}k
            </span>
            {/* Core Bar */}
            <div className={`w-full ${item.height} bg-gradient-to-t from-[#FC5E01]/40 to-[#FC5E01] rounded-t-md transition-all duration-500 group-hover:from-[#FC5E01]`} />
            <span className="text-[10px] font-bold text-[#64748B]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}