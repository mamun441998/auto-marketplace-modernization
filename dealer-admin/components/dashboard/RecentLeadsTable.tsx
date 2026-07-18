// dealer-admin/components/dashboard/RecentLeadsTable.tsx
"use client";

import Link from "next/link";
import { recentLeads } from "@/lib/dealerData";

const statusStyles: Record<string, string> = {
  New: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Contacted: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Qualified: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Closed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export default function RecentLeadsTable() {
  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">Recent Leads</h3>
        <Link href="/leads" className="text-xs font-semibold text-[#FC5E01] hover:text-[#E5540A] transition-colors">
          View All
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {recentLeads.map((lead) => (
          <div key={lead.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E]/50 p-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${lead.gradient} text-[11px] font-bold text-white`}>
                {lead.avatarInitials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{lead.name}</p>
                <p className="text-[11px] text-[#64748B] truncate">{lead.interestedIn}</p>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <span className={`inline-block rounded-full border px-2 py-0.5 text-[9px] font-bold ${statusStyles[lead.status]}`}>
                {lead.status}
              </span>
              <p className="mt-1 text-[10px] text-[#64748B]">
                {new Date(lead.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}