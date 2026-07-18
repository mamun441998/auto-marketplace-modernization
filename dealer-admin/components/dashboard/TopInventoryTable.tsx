// dealer-admin/components/dashboard/TopInventoryTable.tsx
"use client";

import Link from "next/link";
import { topInventory } from "@/lib/dealerData";

const statusStyles: Record<string, string> = {
  "In Stock": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Reserved: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Sold: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

export default function TopInventoryTable() {
  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">Top Inventory</h3>
        <Link href="/inventory" className="text-xs font-semibold text-[#FC5E01] hover:text-[#E5540A] transition-colors">
          View All
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {topInventory.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E]/50 p-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#111B33] border border-[#1e2a4a] text-lg">
                🚗
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{item.model}</p>
                <p className="text-[11px] text-[#64748B] truncate">{item.specs}</p>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold text-white">${item.price.toLocaleString()}</p>
              <span className={`inline-block mt-1 rounded-full border px-2 py-0.5 text-[9px] font-bold ${statusStyles[item.status]}`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}