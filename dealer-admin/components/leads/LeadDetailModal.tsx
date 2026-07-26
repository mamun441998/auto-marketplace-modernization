"use client";

import { useState, useEffect } from "react";
import { X, Phone, Mail, Calendar, Tag, User, Trash2 } from "lucide-react";
import { Lead, LeadStatus, updateLeadStatus, deleteLead } from "@/lib/lead";

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
  onRefresh: () => void;
}

const statusOptions: LeadStatus[] = ["new", "contacted", "qualified", "closed", "lost"];

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

export default function LeadDetailModal({ lead, onClose, onRefresh }: LeadDetailModalProps) {
  const [status, setStatus] = useState<LeadStatus>("new");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (lead) setStatus(lead.status);
  }, [lead]);

  if (!lead) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await updateLeadStatus(lead.id, status);
      if (res.success) {
        onRefresh();
        onClose();
      } else {
        alert((res as any).message || "Failed to update lead.");
      }
    } catch (err) {
      console.error("Update lead failed:", err);
      alert("Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete lead "${lead.name}"?`)) return;
    setIsDeleting(true);
    try {
      const res = await deleteLead(lead.id);
      if (res.success) {
        onRefresh();
        onClose();
      } else {
        alert((res as any).message || "Failed to delete lead.");
      }
    } catch (err) {
      console.error("Delete lead failed:", err);
      alert("Something went wrong.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradientFor(lead.id)} text-sm font-bold text-white`}>
              {lead.initials}
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
            <span className="text-sm text-white truncate">{lead.phone ?? "—"}</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E]/50 p-3">
            <Mail size={15} className="text-[#FC5E01] flex-shrink-0" />
            <span className="text-sm text-white truncate">{lead.email ?? "—"}</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E]/50 p-3">
            <Tag size={15} className="text-[#FC5E01] flex-shrink-0" />
            <span className="text-sm text-white truncate">{interestedIn(lead)}</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E]/50 p-3">
            <User size={15} className="text-[#FC5E01] flex-shrink-0" />
            <span className="text-sm text-white truncate">{formatSource(lead.source)}</span>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-xs text-[#64748B] mb-5">
          <Calendar size={13} />
          Created{" "}
          {lead.created_at
            ? new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
            : "—"}
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
                  status === s ? STATUS[s].style : "border-[#1e2a4a] bg-[#0A0F1E] text-[#64748B]"
                }`}
              >
                {STATUS[s].label}
              </button>
            ))}
          </div>
        </div>

        {/* Customer message (read-only) */}
        <div className="mb-6">
          <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Customer Message</label>
          <div className="min-h-[80px] rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-[#94A3B8] whitespace-pre-line">
            {lead.message?.trim() ? lead.message : "No message provided."}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDelete}
            disabled={isDeleting || isSaving}
            className="flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-400 hover:bg-rose-500/20 transition-colors disabled:opacity-50"
          >
            <Trash2 size={15} />
            {isDeleting ? "..." : "Delete"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-2.5 text-sm font-semibold text-white hover:border-[#2d3d5e] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || isDeleting}
            className="flex-1 rounded-lg bg-[#FC5E01] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}