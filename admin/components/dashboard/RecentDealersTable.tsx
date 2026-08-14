"use client";

import Link from "next/link";
import type { RecentDealer } from "@/lib/dashboard";

const statusStyles: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  suspended: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

const GRADIENTS = [
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-fuchsia-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-sky-500 to-blue-600",
  "from-pink-500 to-rose-500",
];

function initials(name: string) {
  return name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "D";
}

export default function RecentDealersTable({ dealers }: { dealers: RecentDealer[] }) {
  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-white">Recent Signups</h3>
          <p className="text-xs text-[#64748B] mt-0.5">Latest dealerships to join MotoHave</p>
        </div>
        <Link href="/dealers" className="text-xs font-semibold text-[#FC5E01] hover:text-[#E5540A] transition-colors">
          View All
        </Link>
      </div>

      {dealers.length === 0 ? (
        <div className="py-10 text-center text-sm text-[#64748B]">No dealers yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px]">
            <thead>
              <tr className="border-b border-[#1e2a4a]">
                <th className="pb-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Dealer</th>
                <th className="pb-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Owner</th>
                <th className="pb-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Vehicles</th>
                <th className="pb-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Status</th>
                <th className="pb-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Joined</th>
              </tr>
            </thead>
            <tbody>
              {dealers.map((dealer) => (
                <tr key={dealer.id} className="border-b border-[#1e2a4a] last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${GRADIENTS[dealer.id % GRADIENTS.length]} text-[11px] font-bold text-white`}>
                        {initials(dealer.name)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{dealer.name}</p>
                        <p className="text-[11px] text-[#64748B]">{dealer.city || "—"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-[#94A3B8]">{dealer.owner || "—"}</td>
                  <td className="py-3 text-sm text-[#94A3B8]">{dealer.vehicles}</td>
                  <td className="py-3">
                    <span className={`inline-block rounded-full border px-2.5 py-1 text-[10px] font-bold capitalize ${statusStyles[dealer.status] ?? "bg-[#1e2a4a] text-[#94A3B8] border-[#1e2a4a]"}`}>
                      {dealer.status}
                    </span>
                  </td>
                  <td className="py-3 text-right text-xs text-[#64748B]">
                    {dealer.created_at
                      ? new Date(dealer.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}