"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, Users } from "lucide-react";
import LeadDetailModal from "./LeadDetailModal";
import EmptyState from "@/components/shared/EmptyState";
import { Lead } from "@/lib/lead";

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
const formatSource = (s?: string) =>
  !s ? "—" : s === "walk_in" ? "Walk-in" : s.charAt(0).toUpperCase() + s.slice(1);

const statusOptions = ["All Status", "new", "contacted", "qualified", "closed", "lost"];

export default function LeadsTable({ leads, onRefresh }: { leads: Lead[]; onRefresh: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = useMemo(() => {
    let result = [...leads];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          interestedIn(l).toLowerCase().includes(q) ||
          (l.phone ?? "").toLowerCase().includes(q)
      );
    }

    if (selectedStatus !== "All Status") {
      result = result.filter((l) => l.status === selectedStatus);
    }

    return result;
  }, [leads, searchQuery, selectedStatus]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <div className="flex items-center gap-2 rounded-xl border border-[#1e2a4a] bg-[#111B33] px-4 py-2.5 w-full max-w-md">
          <Search size={16} className="text-[#64748B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone or vehicle..."
            className="w-full bg-transparent text-sm text-white placeholder:text-[#64748B] focus:outline-none"
          />
        </div>

        <div className="relative sm:ml-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="appearance-none rounded-xl border border-[#1e2a4a] bg-[#111B33] pl-4 pr-9 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-[#FC5E01] cursor-pointer w-full sm:w-auto capitalize"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status} className="bg-[#0A0F1E]">
                {status === "All Status" ? "All Status" : STATUS[status]?.label ?? status}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead>
              <tr className="border-b border-[#1e2a4a]">
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Lead</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Interested In</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Source</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Status</th>
                <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Created</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.map((lead) => {
                const s = STATUS[lead.status] ?? { label: lead.status, style: "" };
                return (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="border-b border-[#1e2a4a] last:border-0 hover:bg-[#0A0F1E]/50 cursor-pointer"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradientFor(lead.id)} text-[11px] font-bold text-white`}>
                          {lead.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{lead.name}</p>
                          <p className="text-[11px] text-[#64748B] truncate">{lead.phone ?? lead.email ?? "—"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#94A3B8]">{interestedIn(lead)}</td>
                    <td className="px-5 py-4 text-sm text-[#94A3B8]">{formatSource(lead.source)}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-block rounded-full border px-2.5 py-1 text-[10px] font-bold ${s.style}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right text-xs text-[#64748B] whitespace-nowrap">
                      {lead.created_at
                        ? new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && leads.length === 0 && (
          <EmptyState
            icon={Users}
            title="No leads yet"
            description="Leads from your website and marketing campaigns will appear here."
          />
        )}

        {filteredLeads.length === 0 && leads.length > 0 && (
          <div className="py-16 text-center text-[#94A3B8]">No leads match your search.</div>
        )}
      </div>

      <LeadDetailModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onRefresh={onRefresh}
      />
    </div>
  );
}