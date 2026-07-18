"use client";

export default function DashboardInventory() {
  const vehicles = [
    { model: "BMW X5 M-Sport", price: "$58,900", stock: "ST-8921", status: "Available", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    { model: "Tesla Model Y LR", price: "$47,500", stock: "ST-4402", status: "Reserved", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    { model: "Mercedes GLC 300", price: "$61,200", stock: "ST-1109", status: "Available", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  ];

  return (
    <div className="space-y-4 text-white select-none">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-4 text-white shadow-sm">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-blue-100/80">Active Fleet</p>
          <h3 className="mt-1 text-xl font-black tracking-tight">426</h3>
          <p className="text-[10px] font-medium text-blue-100/90">↑ 12%</p>
        </div>

        <div className="rounded-xl bg-[#171717] p-4 border border-[#262626] shadow-sm">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-[#64748B]">Units Sold</p>
          <h3 className="mt-1 text-xl font-black tracking-tight text-white">148</h3>
          <p className="text-[10px] font-medium text-emerald-400">↑ 8%</p>
        </div>

        <div className="rounded-xl bg-[#171717] p-4 border border-[#262626] shadow-sm">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-[#64748B]">Gross Rev</p>
          <h3 className="mt-1 text-xl font-black tracking-tight text-blue-400">$2.4M</h3>
          <p className="text-[10px] font-medium text-blue-400">↑ 18%</p>
        </div>
      </div>

      {/* Main Inventory Status Card */}
      <div className="rounded-xl bg-[#171717] p-4 border border-[#262626] shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-xs font-bold text-white">Live Fleet Inventory</h4>
          <button className="text-[10px] font-bold text-[#FC5E01] hover:text-[#E5540A]">Manage</button>
        </div>

        <div className="space-y-2">
          {vehicles.map((car) => (
            <div
              key={car.model}
              className="flex items-center justify-between rounded-lg border border-[#262626] p-2 bg-[#0A0A0A]/50"
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-[#0A0A0A] border border-[#262626] flex flex-col items-center justify-center text-[#64748B] font-bold text-[8px] leading-none text-center">
                  {car.stock.split('-')[0]}
                  <span className="text-[9px]">{car.stock.split('-')[1]}</span>
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-white">{car.model}</h5>
                  <p className="text-[10px] font-semibold text-[#64748B]">MSRP: {car.price}</p>
                </div>
              </div>

              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${car.color}`}>
                {car.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Activity Logs Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-[#171717] p-3 border border-[#262626] shadow-sm">
          <h5 className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Inbound</h5>
          <div className="space-y-1">
            <p className="text-[10px] font-medium text-[#CBD5E1] truncate">⚡ Quote for X5</p>
            <p className="text-[10px] font-medium text-[#CBD5E1] truncate">📬 Tesla Test-drive</p>
          </div>
        </div>

        <div className="rounded-xl bg-[#171717] p-3 border border-[#262626] shadow-sm">
          <h5 className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Actions</h5>
          <div className="space-y-1">
            <p className="text-[10px] font-medium text-emerald-400">✓ Facebook Sync</p>
            <p className="text-[10px] font-medium text-blue-400">✓ VIN Verified</p>
          </div>
        </div>
      </div>
    </div>
  );
}