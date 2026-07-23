"use client";

export default function DealerSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] border-r border-white/10 bg-[#0F172A] px-6 py-6 text-slate-200">
      <div className="text-lg font-semibold">Dealer Panel</div>
      <div className="mt-6 space-y-2 text-sm text-slate-400">
        <div className="rounded-lg bg-white/5 px-3 py-2">Overview</div>
        <div className="rounded-lg px-3 py-2">Inventory</div>
        <div className="rounded-lg px-3 py-2">Customers</div>
        <div className="rounded-lg px-3 py-2">Settings</div>
      </div>
    </aside>
  );
}
