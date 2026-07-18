// features/mockups/AIMarketingMockup.tsx
"use client";

export default function AIMarketingMockup() {
  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      {/* Ad Preview Card */}
      <div className="rounded-lg border border-[#262626] bg-[#0A0A0A] p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-full bg-[#FC5E01] flex items-center justify-center text-[8px] font-black text-white">
              M
            </div>
            <span className="text-[9px] font-bold text-white">MotoHave Ads</span>
          </div>
          <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-[#FC5E01]/10 text-[#FC5E01] border border-[#FC5E01]/20">
            Boosted
          </span>
        </div>
        <div className="rounded bg-gradient-to-br from-[#FC5E01]/20 to-transparent h-12 flex items-center justify-center text-lg mb-2">
          🚗
        </div>
        <p className="text-[9px] text-white font-semibold">Tesla Model Y — Now Available!</p>
        <p className="text-[8px] text-[#64748B]">Sponsored · Facebook & Instagram</p>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-[#0A0A0A] border border-[#262626] p-2 text-center">
          <p className="text-[8px] text-[#64748B] uppercase font-bold">Reach</p>
          <p className="text-xs font-black text-white">12.4K</p>
        </div>
        <div className="rounded-lg bg-[#0A0A0A] border border-[#262626] p-2 text-center">
          <p className="text-[8px] text-[#64748B] uppercase font-bold">Clicks</p>
          <p className="text-xs font-black text-white">842</p>
        </div>
        <div className="rounded-lg bg-[#0A0A0A] border border-[#262626] p-2 text-center">
          <p className="text-[8px] text-[#64748B] uppercase font-bold">Leads</p>
          <p className="text-xs font-black text-[#FC5E01]">96</p>
        </div>
      </div>

      {/* AI Status */}
      <div className="rounded-lg bg-[#0A0A0A] border border-[#262626] p-2.5 flex items-center justify-between">
        <span className="text-[9px] font-semibold text-[#94A3B8]">AI Auto-optimizing bid</span>
        <span className="text-[9px] font-bold text-emerald-400">● Running</span>
      </div>
    </div>
  );
}