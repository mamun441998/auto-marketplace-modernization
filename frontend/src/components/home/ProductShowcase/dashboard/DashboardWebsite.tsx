"use client";

const featuredCars = [
  { name: "BMW X5 M-Sport", price: "$58,900" },
  { name: "Tesla Model Y LR", price: "$47,500" },
];

export default function DashboardWebsite() {
  return (
    <div className="space-y-3 text-white select-none">
      {/* Header Bar */}
      <div className="rounded-lg border border-[#262626] bg-[#171717] p-2.5 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-[11px] font-bold text-white">Website Builder</h3>
          <p className="text-[8px] text-[#64748B] font-bold uppercase tracking-wider">SEO Live Editor</p>
        </div>
        <button className="rounded-md bg-[#FC5E01] px-2 py-0.5 text-[9px] font-bold text-white hover:bg-[#E5540A] transition">
          Publish
        </button>
      </div>

      {/* Website Preview Window */}
      <div className="overflow-hidden rounded-lg border border-[#262626] bg-[#171717] shadow-sm">
        <div className="relative bg-gradient-to-r from-indigo-700 to-purple-600 px-3 py-4 text-white">
          <p className="text-[8px] font-bold uppercase tracking-widest text-indigo-200">Showroom</p>
          <h2 className="mt-0.5 text-xs font-black leading-tight">Find Your Dream Vehicle</h2>
          <button className="mt-2 rounded bg-white/20 border border-white/20 px-2 py-0.5 text-[9px] font-bold text-white">
            Inventory
          </button>
        </div>

        <div className="border-b border-[#262626] p-2">
          <div className="rounded border border-[#262626] bg-[#0A0A0A] px-1.5 py-1 text-[9px] text-[#64748B]">
            🔍 Search...
          </div>
        </div>

        <div className="p-2">
          <h4 className="text-[9px] font-bold text-white uppercase tracking-wider mb-1.5">Featured</h4>
          <div className="space-y-1">
            {featuredCars.map((car) => (
              <div key={car.name} className="flex items-center gap-1.5 rounded border border-[#262626] p-1 bg-[#0A0A0A]/50">
                <div className="h-6 w-8 rounded bg-[#0A0A0A] border border-[#262626] flex items-center justify-center text-[10px]">🚗</div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-[9px] font-bold text-white truncate">{car.name}</h5>
                  <p className="text-[8px] text-[#64748B] font-semibold">{car.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Pages", val: "12" },
          { label: "Visitors", val: "8.4K", color: "text-blue-400" },
          { label: "SEO", val: "98", color: "text-emerald-400" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg bg-[#171717] border border-[#262626] p-2 text-center shadow-sm">
            <p className="text-[8px] uppercase font-bold text-[#64748B] tracking-wider">{stat.label}</p>
            <h5 className={`mt-0 text-[11px] font-black ${stat.color || "text-white"}`}>{stat.val}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}