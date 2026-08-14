"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAllMyVehicles, Vehicle } from "@/lib/vehicle";

const statusMap: Record<string, { label: string; className: string }> = {
  active:   { label: "In Stock", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  pending:  { label: "Reserved", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  sold:     { label: "Sold",     className: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
  draft:    { label: "Draft",    className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  archived: { label: "Archived", className: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
};

function statusInfo(status: string) {
  return statusMap[status] ?? { label: status, className: "bg-slate-500/10 text-slate-400 border-slate-500/20" };
}

export default function TopInventoryTable() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchAllMyVehicles({ sort_by: "price", sort_dir: "desc" });
        if (res.success) setVehicles((res.vehicles ?? []).slice(0, 5));
      } catch (err) {
        console.error("Load top inventory failed:", err);
      }
    })();
  }, []);

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">Top Inventory</h3>
        <Link href="/inventory" className="text-xs font-semibold text-[#FC5E01] hover:text-[#E5540A] transition-colors">
          View All
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <p className="py-8 text-center text-sm text-[#64748B]">No vehicles yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {vehicles.map((item) => {
            const s = statusInfo(item.status);
            const thumb = item.primary_image_url || item.featured_image?.image_url;
            return (
              <Link
                key={item.id}
                href={`/inventory/${item.id}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E]/50 p-3 hover:border-[#2d3d5e] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#111B33] border border-[#1e2a4a] overflow-hidden text-lg">
                    {thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={thumb} alt="" className="h-full w-full object-cover" />
                    ) : (
                      "🚗"
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate capitalize">
                      {item.make} {item.model}
                    </p>
                    <p className="text-[11px] text-[#64748B] truncate">
                      {item.year} · {item.body_type ?? "—"} · {item.fuel_type ?? "—"}
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-white">
                    {item.price != null ? `$${Number(item.price).toLocaleString()}` : "—"}
                  </p>
                  <span className={`inline-block mt-1 rounded-full border px-2 py-0.5 text-[9px] font-bold ${s.className}`}>
                    {s.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}