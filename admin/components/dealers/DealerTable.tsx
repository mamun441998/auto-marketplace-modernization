"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MoreVertical, Ban, CheckCircle2, Clock, ExternalLink, Loader2 } from "lucide-react";
import DealerFilters from "./DealerFilters";
import DealerStatusBadge from "./DealerStatusBadge";
import { fetchAdminDealers, updateDealerStatus, type AdminDealerRow, type DealersMeta } from "@/lib/adminDealers";

const FRONTEND = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

const GRADIENTS = [
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-fuchsia-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-sky-500 to-blue-600",
  "from-pink-500 to-rose-500",
];
function initials(name: string) {
  return name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "D";
}

export default function DealerTable() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const [dealers, setDealers] = useState<AdminDealerRow[]>([]);
  const [meta, setMeta] = useState<DealersMeta>({ current_page: 1, last_page: 1, per_page: 10, total: 0 });
  const [loading, setLoading] = useState(true);

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetchAdminDealers({ search, status, page });
    if (res.success) {
      setDealers(res.dealers);
      setMeta(res.meta);
    }
    setLoading(false);
  }, [search, status, page]);

  // Debounced reload whenever search/status/page changes
  useEffect(() => {
    const t = setTimeout(load, 350);
    return () => clearTimeout(t);
  }, [load]);

  // Close dropdown on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenuId(null);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  async function changeStatus(d: AdminDealerRow, newStatus: string) {
    setBusyId(d.id);
    setOpenMenuId(null);
    const res = await updateDealerStatus(d.id, newStatus);
    if (res.success) await load();
    setBusyId(null);
  }

  const totalPages = meta.last_page;

  return (
    <div>
      <DealerFilters
        searchQuery={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        selectedStatus={status}
        onStatusChange={(v) => { setStatus(v); setPage(1); }}
        resultCount={meta.total}
      />

      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] overflow-visible">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px]">
            <thead>
              <tr className="border-b border-[#1e2a4a]">
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Dealer</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Owner</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Location</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Vehicles</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Status</th>
                <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dealers.map((dealer) => (
                <tr key={dealer.id} className="border-b border-[#1e2a4a] last:border-0 hover:bg-[#0A0F1E]/50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {dealer.logo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={dealer.logo_url} alt="" className="h-9 w-9 rounded-lg object-cover border border-[#1e2a4a] bg-white flex-shrink-0" />
                      ) : (
                        <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${GRADIENTS[dealer.id % GRADIENTS.length]} text-xs font-bold text-white flex-shrink-0`}>
                          {initials(dealer.name)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{dealer.name}</p>
                        <p className="text-[11px] text-[#64748B] truncate">{dealer.email || "—"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#94A3B8] whitespace-nowrap">{dealer.owner?.name || "—"}</td>
                  <td className="px-5 py-4 text-sm text-[#94A3B8] whitespace-nowrap">{dealer.city || "—"}</td>
                  <td className="px-5 py-4 text-sm text-[#94A3B8]">{dealer.vehicles}</td>
                  <td className="px-5 py-4"><DealerStatusBadge status={dealer.status} /></td>
                  <td className="px-5 py-4 text-right relative">
                    {busyId === dealer.id ? (
                      <Loader2 size={16} className="animate-spin text-[#64748B] inline" />
                    ) : (
                      <button
                        onClick={() => setOpenMenuId(openMenuId === dealer.id ? null : dealer.id)}
                        className="rounded-lg p-1.5 text-[#94A3B8] hover:bg-[#0A0F1E] hover:text-white transition-colors"
                      >
                        <MoreVertical size={16} />
                      </button>
                    )}

                    {openMenuId === dealer.id && (
                      <div ref={menuRef} className="absolute right-5 top-full z-20 mt-1 w-48 rounded-xl border border-[#1e2a4a] bg-[#0C1A32] p-1.5 shadow-xl text-left">
                        {dealer.slug && (
                          <a
                            href={`${FRONTEND}/s/${dealer.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white hover:bg-[#111B33] transition-colors"
                          >
                            <ExternalLink size={15} className="text-[#94A3B8]" />
                            Visit Website
                          </a>
                        )}

                        {dealer.status !== "active" && (
                          <button onClick={() => changeStatus(dealer, "active")} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-emerald-400 hover:bg-[#111B33] transition-colors">
                            <CheckCircle2 size={15} />
                            Activate
                          </button>
                        )}
                        {dealer.status !== "pending" && (
                          <button onClick={() => changeStatus(dealer, "pending")} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-amber-400 hover:bg-[#111B33] transition-colors">
                            <Clock size={15} />
                            Set Pending
                          </button>
                        )}
                        {dealer.status !== "suspended" && (
                          <button onClick={() => changeStatus(dealer, "suspended")} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-rose-400 hover:bg-[#111B33] transition-colors">
                            <Ban size={15} />
                            Suspend
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {loading ? (
          <div className="py-16 text-center text-[#94A3B8]">Loading dealers…</div>
        ) : dealers.length === 0 ? (
          <div className="py-16 text-center text-[#94A3B8]">No dealers match your filters.</div>
        ) : null}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-lg border border-[#1e2a4a] bg-[#111B33] px-4 py-2 text-sm font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#2d3d5e] transition-colors">
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => setPage(p)} className={`h-10 w-10 rounded-lg text-sm font-semibold transition-colors ${page === p ? "bg-[#FC5E01] text-white" : "border border-[#1e2a4a] bg-[#111B33] text-[#94A3B8] hover:text-white hover:border-[#2d3d5e]"}`}>
              {p}
            </button>
          ))}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-lg border border-[#1e2a4a] bg-[#111B33] px-4 py-2 text-sm font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#2d3d5e] transition-colors">
            Next
          </button>
        </div>
      )}
    </div>
  );
}