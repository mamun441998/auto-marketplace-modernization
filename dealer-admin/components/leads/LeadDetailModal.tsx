// dealer-admin/components/leads/LeadDetailModal.tsx
"use client";

import { useState, useEffect } from "react";
import { X, Phone, Mail, Calendar, Tag, User } from "lucide-react";
import { Lead } from "@/lib/dealerData";

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
}

const statusOptions: Array<Lead["status"]> = ["New", "Contacted", "Qualified", "Closed"];

const statusStyles: Record<string, string> = {
  New: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Contacted: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Qualified: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Closed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export default function LeadDetailModal({ lead, onClose }: LeadDetailModalProps) {
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Lead["status"]>("New");

  useEffect(() => {
    if (lead) {
      setNotes(lead.notes);
      setStatus(lead.status);
    }
  }, [lead]);

  if (!lead) return null;

  const handleSave = () => {
    // 💡 Backend connect korar somoy: eikhane API call hobe
    // jemon: await fetch(`/api/leads/${lead.id}`, { method: "PATCH", body: JSON.stringify({ status, notes }) })
    alert(`Lead "${lead.name}" updated — Status: ${status} (backend not connected yet)`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${lead.gradient} text-sm font-bold text-white`}>
              {lead.avatarInitials}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{lead.name}</h3>
              <p className="text-xs text-[#64748B]">Lead #{lead.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div className="flex items-center gap-2.5 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E]/50 p-3">
            <Phone size={15} className="text-[#FC5E01] flex-shrink-0" />
            <span className="text-sm text-white truncate">{lead.phone}</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E]/50 p-3">
            <Mail size={15} className="text-[#FC5E01] flex-shrink-0" />
            <span className="text-sm text-white truncate">{lead.email}</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E]/50 p-3">
            <Tag size={15} className="text-[#FC5E01] flex-shrink-0" />
            <span className="text-sm text-white truncate">{lead.interestedIn}</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E]/50 p-3">
            <User size={15} className="text-[#FC5E01] flex-shrink-0" />
            <span className="text-sm text-white truncate">{lead.source}</span>
          </div>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-2 text-xs text-[#64748B] mb-5">
          <Calendar size={13} />
          Created {new Date(lead.createdDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          {lead.lastContactDate && (
            <>
              <span>·</span>
              Last contacted {new Date(lead.lastContactDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </>
          )}
        </div>

        {/* Status */}
        <div className="mb-5">
          <label className="mb-2 block text-xs font-semibold text-[#94A3B8]">Lead Status</label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${
                  status === s ? statusStyles[s] : "border-[#1e2a4a] bg-[#0A0F1E] text-[#64748B]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full resize-none rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-2.5 text-sm font-semibold text-white hover:border-[#2d3d5e] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 rounded-lg bg-[#FC5E01] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}