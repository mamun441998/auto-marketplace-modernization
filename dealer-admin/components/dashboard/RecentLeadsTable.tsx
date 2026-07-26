"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchMyLeads, Lead } from "@/lib/lead";

const STATUS: Record<string, { label: string; style: string }> = {
  new:       { label: "New",       style: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  contacted: { label: "Contacted", style: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  qualified: { label: "Qualified", style: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  closed:    { label: "Closed",    style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  lost:      { label: "Lost",      style: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
};

const GRADIENTS = [
  "from-blue-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-violet-500 to-purple-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
];
const gradientFor = (id: number) => GRADIENTS[id % GRADIENTS.length];
const interestedIn = (l: Lead) => l.vehicle?.title ?? "General inquiry";

export default function RecentLeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchMyLeads({ per_page: 5 });
        if (res.success) setLeads(res.leads ?? []);
      } catch (err) {
        console.error("Load recent leads failed:", err);
      }
    })();
  }, []);

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">Recent Leads</h3>
        <Link href="/leads" className="text-xs font-semibold text-[#FC5E01] hover:text-[#E5540A] transition-colors">
          View All
        </Link>
      </div>

      {leads.length === 0 ? (
        <p className="py-8 text-center text-sm text-[#64748B]">No leads yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {leads.map((lead) => {
            const s = STATUS[lead.status] ?? { label: lead.status, style: "" };
            return (
              <Link
                key={lead.id}
                href="/leads"
                className="flex items-center justify-between gap-3 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E]/50 p-3 hover:border-[#2d3d5e] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradientFor(lead.id)} text-[11px] font-bold text-white`}>
                    {lead.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{lead.name}</p>
                    <p className="text-[11px] text-[#64748B] truncate">{interestedIn(lead)}</p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className={`inline-block rounded-full border px-2 py-0.5 text-[9px] font-bold ${s.style}`}>
                    {s.label}
                  </span>
                  <p className="mt-1 text-[10px] text-[#64748B]">
                    {lead.created_at
                      ? new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                      : "—"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}