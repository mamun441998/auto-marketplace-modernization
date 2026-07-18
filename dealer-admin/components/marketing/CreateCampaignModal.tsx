"use client";

import { useState } from "react";
import { X, Megaphone, Mail, MessageSquare, Share2, DollarSign, Users, Sparkles } from "lucide-react";

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateCampaignModal({ isOpen, onClose }: CreateCampaignModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "Email",
    audienceSegment: "all-leads",
    budget: "100",
    scheduleDate: "2026-07-11",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated API Sync to Production Marketing Workers
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Marketing pipeline sync initialized successfully!");
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-[#111B33] border border-[#1e2a4a] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1e2a4a]">
          <div className="flex items-center gap-2">
            <Megaphone size={16} className="text-[#FC5E01]" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider">Initialize Broadcast Engine</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#64748B] hover:text-white p-1 rounded-lg hover:bg-[#0A0F1E] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto max-h-[80vh]">
          
          {/* Campaign Name */}
          <div>
            <label className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">
              Campaign Identifier
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01] transition-colors"
              placeholder="e.g., Q3 Premium SUV Retargeting Blast"
            />
          </div>

          {/* Marketing Channel Matrix Selector */}
          <div>
            <label className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2">
              Broadcast Channel Pipeline
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "Email", icon: Mail, label: "Email Blast", color: "text-blue-400" },
                { id: "SMS", icon: MessageSquare, label: "SMS Wave", color: "text-emerald-400" },
                { id: "Social", icon: Share2, label: "Social Ads", color: "text-purple-400" },
              ].map((channel) => {
                const Icon = channel.icon;
                const isSelected = formData.type === channel.id;
                return (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: channel.id })}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all gap-1.5 ${
                      isSelected
                        ? "border-[#FC5E01] bg-[#FC5E01]/5 text-white"
                        : "border-[#1e2a4a] bg-[#0A0F1E]/50 text-[#64748B] hover:border-[#2d3d5e]"
                    }`}
                  >
                    <Icon size={16} className={isSelected ? channel.color : "text-[#64748B]"} />
                    <span className="text-[10px] font-bold tracking-tight">{channel.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Audience Segment + Allocation Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">
                Target Audience Split
              </label>
              <select
                value={formData.audienceSegment}
                onChange={(e) => setFormData({ ...formData, audienceSegment: e.target.value })}
                className="w-full rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]"
              >
                <option value="all-leads">All Verified Leads (Active)</option>
                <option value="suv-buyers">SUV Category Inquirers</option>
                <option value="financing-pending">Financing Pending Pipeline</option>
                <option value="past-customers">Past Showroom Buyers</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">
                Allocated Budget Limits
              </label>
              <div className="relative flex items-center">
                <DollarSign size={13} className="absolute left-3.5 text-[#64748B]" />
                <input
                  type="number"
                  min="10"
                  required
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] pl-8 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]"
                  placeholder="100"
                />
              </div>
            </div>
          </div>

          {/* Schedule Configuration */}
          <div>
            <label className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">
              Automated Dispatch Schedule
            </label>
            <input
              type="date"
              required
              value={formData.scheduleDate}
              onChange={(e) => setFormData({ ...formData, scheduleDate: e.target.value })}
              className="w-full rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01] font-mono"
            />
          </div>

          {/* Actions Operations Hub */}
          <div className="pt-4 border-t border-[#1e2a4a]/60 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#1e2a4a] text-xs font-bold text-[#94A3B8] hover:text-white hover:bg-[#0A0F1E] transition-colors"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FC5E01] text-xs font-black text-white hover:bg-[#E5540A] transition-all disabled:opacity-50 shadow-md"
            >
              <Sparkles size={13} />
              {isSubmitting ? "Deploying Engine..." : "Deploy Campaign Pipeline"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}