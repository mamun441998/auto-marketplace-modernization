// dealer-admin/components/leads/LeadsPipeline.tsx
"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import LeadDetailModal from "./LeadDetailModal";
import { leads, Lead } from "@/lib/dealerData";

const columns: Array<{ status: Lead["status"]; label: string; color: string }> = [
  { status: "New", label: "New", color: "border-blue-500/30 bg-blue-500/5" },
  { status: "Contacted", label: "Contacted", color: "border-amber-500/30 bg-amber-500/5" },
  { status: "Qualified", label: "Qualified", color: "border-violet-500/30 bg-violet-500/5" },
  { status: "Closed", label: "Closed", color: "border-emerald-500/30 bg-emerald-500/5" },
];

export default function LeadsPipeline() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column) => {
          const columnLeads = leads.filter((l) => l.status === column.status);

          return (
            <div key={column.status} className={`rounded-2xl border ${column.color} p-3`}>
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-sm font-bold text-white">{column.label}</h3>
                <span className="rounded-full bg-[#0A0F1E] border border-[#1e2a4a] px-2 py-0.5 text-[10px] font-bold text-[#94A3B8]">
                  {columnLeads.length}
                </span>
              </div>

              {/* Lead Cards */}
              <div className="flex flex-col gap-2.5 min-h-[200px]">
                {columnLeads.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="text-left rounded-xl border border-[#1e2a4a] bg-[#111B33] p-3 hover:border-[#2d3d5e] transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${lead.gradient} text-[9px] font-bold text-white`}>
                        {lead.avatarInitials}
                      </div>
                      <p className="text-xs font-semibold text-white truncate">{lead.name}</p>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] truncate mb-2">{lead.interestedIn}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-[#64748B]">{lead.source}</span>
                      <Phone size={11} className="text-[#64748B]" />
                    </div>
                  </button>
                ))}

                {columnLeads.length === 0 && (
                  <p className="text-xs text-[#475569] text-center py-6">No leads here</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  );
}