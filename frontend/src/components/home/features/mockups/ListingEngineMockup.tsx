// features/mockups/ListingEngineMockup.tsx
"use client";

export default function ListingEngineMockup() {
  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      {/* Upload Step */}
      <div className="rounded-lg bg-[#0A0A0A] border border-dashed border-violet-500/40 p-3 flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-base">
          📷
        </div>
        <div>
          <p className="text-[9px] font-bold text-white">Image Uploaded</p>
          <p className="text-[8px] text-[#64748B]">bmw-x5-front.jpg</p>
        </div>
      </div>

      {/* AI Detection Progress */}
      <div className="rounded-lg bg-[#0A0A0A] border border-[#262626] p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-bold text-white">AI Detecting Details</span>
          <span className="text-[8px] font-bold text-violet-400">98%</span>
        </div>
        <div className="h-1.5 rounded-full bg-[#171717] overflow-hidden">
          <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
        </div>
      </div>

      {/* Detected Specs */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-[#0A0A0A] border border-[#262626] p-2">
          <p className="text-[8px] text-[#64748B] uppercase font-bold">Model</p>
          <p className="text-[10px] font-bold text-white">BMW X5 2023</p>
        </div>
        <div className="rounded-lg bg-[#0A0A0A] border border-[#262626] p-2">
          <p className="text-[8px] text-[#64748B] uppercase font-bold">Est. Price</p>
          <p className="text-[10px] font-bold text-white">$58,900</p>
        </div>
      </div>

      {/* Result */}
      <div className="rounded-lg bg-[#0A0A0A] border border-[#262626] p-2.5 flex items-center justify-between">
        <span className="text-[9px] font-semibold text-[#94A3B8]">Listing generated</span>
        <span className="text-[9px] font-bold text-emerald-400">✓ Ready to Publish</span>
      </div>
    </div>
  );
}