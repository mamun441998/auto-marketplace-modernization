"use client";

const customers = [
  { name: "John Carter", status: "Hot Lead", color: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
  { name: "Emma Watson", status: "Follow Up", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  { name: "Michael Lee", status: "Won Client", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
];

const followUps = [
  { name: "Sophia Brown", time: "10:30 AM" },
  { name: "David Wilson", time: "02:00 PM" },
];

export default function DashboardCRM() {
  return (
    <div className="space-y-4 text-white select-none">
      {/* CRM KPI Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-4 text-white shadow-sm">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-emerald-100/80">Total Leads</p>
          <h3 className="mt-1 text-xl font-black tracking-tight">238</h3>
          <p className="text-[10px] font-medium text-emerald-100/90">↑ 14%</p>
        </div>

        <div className="rounded-xl bg-[#171717] p-4 border border-[#262626] shadow-sm">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-[#64748B]">Converted</p>
          <h3 className="mt-1 text-xl font-black tracking-tight text-white">154</h3>
          <p className="text-[10px] font-medium text-emerald-400">↑ 9%</p>
        </div>

        <div className="rounded-xl bg-[#171717] p-4 border border-[#262626] shadow-sm">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-[#64748B]">Win Rate</p>
          <h3 className="mt-1 text-xl font-black tracking-tight text-violet-400">68%</h3>
          <p className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">Excellent</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div className="rounded-xl bg-[#171717] p-4 border border-[#262626] shadow-sm flex flex-col justify-between">
          <h4 className="text-xs font-bold text-white mb-3">Deal Pipeline</h4>
          <div className="space-y-2">
            {customers.map((customer) => (
              <div key={customer.name} className="flex items-center justify-between rounded-lg border border-[#262626] p-2 bg-[#0A0A0A]/50">
                <h5 className="text-[11px] font-bold text-white">{customer.name}</h5>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${customer.color}`}>
                  {customer.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-[#171717] p-4 border border-[#262626] shadow-sm">
          <h4 className="text-xs font-bold text-white mb-4">Conversion Funnel</h4>
          <div className="space-y-3">
            {[ {l:"Leads", p:"100%"}, {l:"Proposals", p:"74%"}, {l:"Closed", p:"42%"} ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-[10px] font-bold text-[#94A3B8] mb-1">
                  <span>{item.l}</span> <span>{item.p}</span>
                </div>
                <div className="h-2 rounded-full bg-[#0A0A0A] overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: item.p }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Follow-ups */}
      <div className="rounded-xl bg-[#171717] p-4 border border-[#262626] shadow-sm">
        <h4 className="text-xs font-bold text-white mb-3">Smart Follow-ups</h4>
        <div className="grid grid-cols-2 gap-3">
          {followUps.map((item) => (
            <div key={item.name} className="p-2.5 rounded-lg border border-[#262626] bg-[#0A0A0A]/50 flex justify-between items-center">
              <div>
                <p className="text-[11px] font-bold text-white">{item.name}</p>
                <p className="text-[10px] text-[#64748B]">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}