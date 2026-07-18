"use client";

import { useState } from "react";
import { Mail, MessageSquare, Share2, Calendar, ArrowRight } from "lucide-react";
import CampaignDetailsModal from "./CampaignDetailsModal";

export interface MarketingCampaign {
  id: string;
  name: string;
  type: "Email" | "SMS" | "Social";
  status: "Running" | "Scheduled" | "Completed";
  audienceCount: number;
  sentCount: number;
  clicks: number;
  startDate: string;
  budget: number;
}

// এই ডাটা মিসিং হওয়ার কারণে এরর আসছিল
const activeCampaigns: MarketingCampaign[] = [
  {
    id: "camp-1",
    name: "Summer Blast Inventory Clearance",
    type: "Email",
    status: "Running",
    audienceCount: 4500,
    sentCount: 3200,
    clicks: 412,
    startDate: "2026-07-01",
    budget: 150,
  },
  {
    id: "camp-2",
    name: "VIP Early Access: Tesla Inventory Arrival",
    type: "SMS",
    status: "Scheduled",
    audienceCount: 1200,
    sentCount: 0,
    clicks: 0,
    startDate: "2026-07-15",
    budget: 80,
  },
  {
    id: "camp-3",
    name: "4th of July SUV Retargeting Ads",
    type: "Social",
    status: "Completed",
    audienceCount: 8500,
    sentCount: 8500,
    clicks: 1240,
    startDate: "2026-06-28",
    budget: 400,
  },
];

export default function CampaignList() {
  const [selectedCampaign, setSelectedCampaign] = useState<MarketingCampaign | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const getTypeIcon = (type: MarketingCampaign["type"]) => {
    switch (type) {
      case "Email":
        return <Mail size={14} className="text-blue-400" />;
      case "SMS":
        return <MessageSquare size={14} className="text-emerald-400" />;
      case "Social":
        return <Share2 size={14} className="text-purple-400" />;
    }
  };

  const getStatusClass = (status: MarketingCampaign["status"]) => {
    switch (status) {
      case "Running":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Scheduled":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Completed":
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
      <div className="flex items-center justify-between border-b border-[#1e2a4a] pb-4 mb-4">
        <div>
          <h3 className="text-sm font-black text-white tracking-tight">Recent Marketing Campaigns</h3>
          <p className="text-[11px] text-[#64748B] mt-0.5">Track multi-channel reach and engagement performance.</p>
        </div>
      </div>

      <div className="space-y-3.5">
        {activeCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="group flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E]/50 hover:border-[#2d3d5e] transition-all gap-4"
          >
            {/* Left: Info & Channel Type */}
            <div className="flex items-start gap-3 min-w-[240px]">
              <div className="p-2.5 rounded-xl bg-[#111B33] border border-[#1e2a4a] mt-0.5">
                {getTypeIcon(campaign.type)}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-[#FC5E01] transition-colors">
                  {campaign.name}
                </h4>
                <div className="flex items-center gap-2 mt-1.5 text-[10px] text-[#64748B]">
                  <span className={`px-2 py-0.5 rounded-md border text-[9px] font-bold ${getStatusClass(campaign.status)}`}>
                    {campaign.status}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    Launched: {campaign.startDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Middle: Metrics Numbers */}
            <div className="grid grid-cols-3 gap-6 sm:gap-12 md:gap-8 max-w-sm w-full md:w-auto">
              <div>
                <span className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Audience</span>
                <span className="text-xs font-black text-white mt-0.5 block">
                  {campaign.audienceCount.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Dispatched</span>
                <span className="text-xs font-black text-slate-300 mt-0.5 block">
                  {campaign.sentCount.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Clicks</span>
                <span className="text-xs font-black text-emerald-400 mt-0.5 block">
                  {campaign.clicks > 0 ? campaign.clicks.toLocaleString() : "—"}
                </span>
              </div>
            </div>

            {/* Right: Budget Tag & Action */}
            <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-[#1e2a4a]/40">
              <div className="text-left md:text-right">
                <span className="block text-[9px] font-bold text-[#64748B] uppercase tracking-wider">Allocated Budget</span>
                <span className="text-xs font-black text-white mt-0.5 block">${campaign.budget}</span>
              </div>
              
              <button
                type="button"
                onClick={() => {
                  setSelectedCampaign(campaign);
                  setIsDetailsOpen(true);
                }}
                className="p-2 rounded-xl bg-[#111B33] border border-[#1e2a4a] text-[#94A3B8] hover:text-white hover:border-[#FC5E01] transition-colors"
              >
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Details Modal */}
      <CampaignDetailsModal
        campaign={selectedCampaign}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedCampaign(null);
        }}
      />
    </div>
  );
}