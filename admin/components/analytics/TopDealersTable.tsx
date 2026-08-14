"use client";

import { Trophy, CarFront, Users } from "lucide-react";
import type { TopDealer } from "@/lib/adminAnalytics";

const rankStyles = [
  "bg-amber-400/10 text-amber-400 border-amber-400/30",
  "bg-slate-300/10 text-slate-300 border-slate-300/30",
  "bg-orange-600/10 text-orange-400 border-orange-600/30",
];
const GRADIENTS = [
  "from-blue-500 to-cyan-500", "from-violet-500 to-fuchsia-500", "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500", "from-sky-500 to-blue-600", "from-pink-500 to-rose-500",
];
function initials(name: string) {
  return name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "D";
}

export default function TopDealersTable({ dealers }: { dealers: TopDealer[] }) {
  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy size={16} className="text-[#FC5E01]" />
        <div>
          <h3 className="text-sm font-bold text-white">Top Performing Dealers</h3>
          <p className="text-xs text-[#64748B] mt-0.5">Ranked by vehicles listed</p>
        </div>
      </div>

      {dealers.length === 0 ? (
        <div className="py-10 text-center text-[#64748B] text-sm">No dealers yet.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {dealers.map((dealer, index) => (
            <div key={dealer.id} className="flex items-center gap-4 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E]/50 p-4">
              <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border text-xs font-black ${index < 3 ? rankStyles[index] : "bg-[#111B33] text-[#64748B] border-[#1e2a4a]"}`}>
                {index + 1}
              </div>

              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${GRADIENTS[dealer.id % GRADIENTS.length]} text-xs font-bold text-white`}>
                {initials(dealer.name)}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{dealer.name}</p>
                <p className="text-xs text-[#64748B]">{[dealer.city, dealer.state].filter(Boolean).join(", ") || "—"}</p>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0 text-right">
                <div>
                  <p className="text-sm font-bold text-white flex items-center gap-1 justify-end"><CarFront size={13} className="text-[#FC5E01]" /> {dealer.vehicles}</p>
                  <p className="text-[10px] text-[#64748B]">vehicles</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-white flex items-center gap-1 justify-end"><Users size={13} className="text-blue-400" /> {dealer.leads}</p>
                  <p className="text-[10px] text-[#64748B]">leads</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}