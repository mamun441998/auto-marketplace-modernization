"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { MoreVertical, ExternalLink, Trash2 } from "lucide-react";
import FancySelect from "@/components/FancySelect";
import type { DomainRow } from "@/lib/adminDomains";

const FRONTEND = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

const GRADIENTS = [
  "from-blue-500 to-cyan-500", "from-violet-500 to-fuchsia-500", "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500", "from-sky-500 to-blue-600", "from-pink-500 to-rose-500",
];
function initials(name: string) {
  return name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "D";
}

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "live", label: "Live" },
  { value: "pending", label: "Pending" },
];

export default function DomainsTable({
  domains, loading, onRemove,
}: {
  domains: DomainRow[];
  loading: boolean;
  onRemove: (id: number) => void;
}) {
  const [status, setStatus] = useState("all");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenuId(null);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const filtered = useMemo(() => {
    if (status === "all") return domains;
    return domains.filter((d) => (status === "live" ? d.published : !d.published));
  }, [domains, status]);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-[#94A3B8]">
          Showing <span className="font-bold text-white">{filtered.length}</span> domains
        </p>
        <div className="w-40">
          <FancySelect value={status} onChange={setStatus} options={STATUS_OPTIONS} />
        </div>
      </div>

      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] overflow-visible">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="border-b border-[#1e2a4a]">
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Domain</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Dealer</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Status</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Connected</th>
                <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((domain) => (
                <tr key={domain.id} className="border-b border-[#1e2a4a] last:border-0 hover:bg-[#0A0F1E]/50">
                  <td className="px-5 py-4"><p className="text-sm font-semibold text-white font-mono">{domain.domain}</p></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${GRADIENTS[domain.id % GRADIENTS.length]} text-[10px] font-bold text-white flex-shrink-0`}>
                        {initials(domain.dealer_name)}
                      </div>
                      <p className="text-sm text-[#94A3B8] truncate">{domain.dealer_name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-block rounded-full border px-2.5 py-1 text-[10px] font-bold ${domain.published ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
                      {domain.published ? "Live" : "Pending"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#94A3B8] whitespace-nowrap">
                    {domain.created_at ? new Date(domain.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                  </td>
                  <td className="px-5 py-4 text-right relative">
                    <button onClick={() => setOpenMenuId(openMenuId === domain.id ? null : domain.id)} className="rounded-lg p-1.5 text-[#94A3B8] hover:bg-[#0A0F1E] hover:text-white transition-colors">
                      <MoreVertical size={16} />
                    </button>
                    {openMenuId === domain.id && (
                      <div ref={menuRef} className="absolute right-5 top-full z-20 mt-1 w-52 rounded-xl border border-[#1e2a4a] bg-[#0C1A32] p-1.5 shadow-xl text-left">
                        <a href={`https://${domain.domain}`} target="_blank" rel="noreferrer" className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white hover:bg-[#111B33] transition-colors">
                          <ExternalLink size={15} className="text-[#94A3B8]" /> Open Domain
                        </a>
                        <a href={`${FRONTEND}/s/${domain.slug}`} target="_blank" rel="noreferrer" className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-blue-400 hover:bg-[#111B33] transition-colors">
                          <ExternalLink size={15} /> Visit Live Site
                        </a>
                        <button onClick={() => { onRemove(domain.id); setOpenMenuId(null); }} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-rose-400 hover:bg-[#111B33] transition-colors">
                          <Trash2 size={15} /> Remove Domain
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {loading ? (
          <div className="py-16 text-center text-[#94A3B8]">Loading domains…</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-[#94A3B8]">No custom domains connected yet.</div>
        ) : null}
      </div>
    </div>
  );
}