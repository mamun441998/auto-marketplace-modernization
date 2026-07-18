"use client";

import { X, BarChart3, Users, MousePointerClick, TrendingUp, CheckCircle2, ArrowUpRight, Mail } from "lucide-react";
import { MarketingCampaign } from "./CampaignList";

interface CampaignDetailsModalProps {
  campaign: MarketingCampaign | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CampaignDetailsModal({ campaign, isOpen, onClose }: CampaignDetailsModalProps) {
  if (!isOpen || !campaign) return null;

  // ক্যালকুলেটেড প্রোডাকশন মেট্রিকস
  const openRate = campaign.type === "SMS" ? "98.2%" : "24.5%";
  const ctr = campaign.sentCount > 0 ? ((campaign.clicks / campaign.sentCount) * 100).toFixed(1) : "0.0";
  const costPerClick = campaign.clicks > 0 ? (campaign.budget / campaign.clicks).toFixed(2) : "0.00";

  // মক কনভার্টেড লিড ডাটা যারা এই ক্যাম্পেইন থেকে এসেছে
  const generatedLeads = [
    { name: "Robert Taylor", car: "Toyota Camry 2023", action: "Clicked Financing Link", time: "2 hours ago" },
    { name: "Linda Garcia", car: "Tesla Model Y", action: "Booked Test Drive", time: "5 hours ago" },
    { name: "James Miller", car: "Ford F-150", action: "Submitted Inquiry Form", time: "1 day ago" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-[#111B33] border border-[#1e2a4a] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1e2a4a] bg-[#0A0F1E]/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FC5E01]/10 rounded-xl border border-[#FC5E01]/20 text-[#FC5E01]">
              <BarChart3 size={16} />
            </div>
            <div>
              <h3 className="text-sm font-black text-white tracking-tight">{campaign.name}</h3>
              <p className="text-[10px] text-[#64748B] uppercase tracking-widest font-mono mt-0.5">
                Internal Node ID: {campaign.id} · Type: {campaign.type}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#64748B] hover:text-white p-1 rounded-lg hover:bg-[#0A0F1E] transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
          
          {/* Real-time Performance Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#0A0F1E] border border-[#1e2a4a] rounded-xl p-3.5">
              <span className="block text-[9px] font-bold text-[#64748B] uppercase tracking-wider">Delivery Success</span>
              <span className="text-lg font-black text-white mt-1 block">
                {campaign.status === "Scheduled" ? "0" : "99.8%"}
              </span>
            </div>
            <div className="bg-[#0A0F1E] border border-[#1e2a4a] rounded-xl p-3.5">
              <span className="block text-[9px] font-bold text-[#64748B] uppercase tracking-wider">Avg. Open Rate</span>
              <span className="text-lg font-black text-blue-400 mt-1 block">
                {campaign.status === "Scheduled" ? "—" : openRate}
              </span>
            </div>
            <div className="bg-[#0A0F1E] border border-[#1e2a4a] rounded-xl p-3.5">
              <span className="block text-[9px] font-bold text-[#64748B] uppercase tracking-wider">Click Through (CTR)</span>
              <span className="text-lg font-black text-emerald-400 mt-1 block">
                {campaign.status === "Scheduled" ? "—" : `${ctr}%`}
              </span>
            </div>
            <div className="bg-[#0A0F1E] border border-[#1e2a4a] rounded-xl p-3.5">
              <span className="block text-[9px] font-bold text-[#64748B] uppercase tracking-wider">Cost Per Click (CPC)</span>
              <span className="text-lg font-black text-purple-400 mt-1 block">
                {campaign.status === "Scheduled" ? "—" : `$${costPerClick}`}
              </span>
            </div>
          </div>

          {/* Real Results: Captured Leads Pipeline */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Campaign Conversion Stream</h4>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md font-bold">
                {campaign.status === "Scheduled" ? "0 Leads" : "+3 High-Intent Leads"}
              </span>
            </div>

            {campaign.status === "Scheduled" ? (
              <div className="border border-dashed border-[#1e2a4a] rounded-xl p-8 text-center text-xs text-[#64748B]">
                This campaign is scheduled. Real-time conversion logs will stream here once dispatched.
              </div>
            ) : (
              <div className="space-y-2">
                {generatedLeads.map((lead, index) => (
                  <div key={index} className="flex items-center justify-between p-3.5 bg-[#0A0F1E]/60 border border-[#1e2a4a] rounded-xl text-xs">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      <div>
                        <p className="font-bold text-white">{lead.name}</p>
                        <p className="text-[10px] text-[#64748B] mt-0.5">Interested in <span className="text-slate-300 font-medium">{lead.car}</span></p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-medium border border-blue-500/10">
                        {lead.action}
                      </span>
                      <p className="text-[9px] text-[#64748B] mt-1">{lead.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Budget & Infrastructure Analytics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#1e2a4a]/60 pt-4 text-xs text-[#94A3B8]">
            <div className="space-y-1.5">
              <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider">Channel Infrastructure</span>
              <p className="text-white flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={13} className="text-emerald-400" /> 
                {campaign.type === "Email" ? "AWS SES High-Deliverability Pool" : campaign.type === "SMS" ? "Twilio Premium Telephony Node" : "Meta Conversion API Sandbox"}
              </p>
            </div>
            <div className="space-y-1.5 sm:text-right">
              <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider">Financial Burn Rate</span>
              <p className="text-white font-medium">Total Consumed: <span className="text-amber-400">${campaign.status === "Completed" ? campaign.budget : campaign.status === "Running" ? (campaign.budget * 0.7).toFixed(0) : "0"}</span> / ${campaign.budget}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}