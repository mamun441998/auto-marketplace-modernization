"use client";

import type { SubscriptionRow } from "@/lib/adminBilling";

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Trial: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  None: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};
const GRADIENTS = [
  "from-blue-500 to-cyan-500", "from-violet-500 to-fuchsia-500", "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500", "from-sky-500 to-blue-600", "from-pink-500 to-rose-500",
];
function initials(name: string) {
  return name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "D";
}

export default function SubscriptionsTable({ subscriptions }: { subscriptions: SubscriptionRow[] }) {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-sm font-bold text-white">Subscriptions</h2>
        <p className="text-xs text-[#64748B] mt-0.5">All dealership subscriptions and their status</p>
      </div>

      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="border-b border-[#1e2a4a]">
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Dealer</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Plan</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Cycle</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Amount</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Renews</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Status</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.length === 0 ? (
                <tr><td colSpan={6} className="py-14 text-center text-[#64748B] text-sm">No subscriptions yet.</td></tr>
              ) : subscriptions.map((sub) => (
                <tr key={sub.id} className="border-b border-[#1e2a4a] last:border-0 hover:bg-[#0A0F1E]/50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${GRADIENTS[sub.id % GRADIENTS.length]} text-[11px] font-bold text-white flex-shrink-0`}>
                        {initials(sub.dealer_name)}
                      </div>
                      <p className="text-sm font-semibold text-white truncate">{sub.dealer_name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#94A3B8]">{sub.plan}</td>
                  <td className="px-5 py-4 text-sm text-[#94A3B8]">{sub.cycle}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-white">{sub.amount > 0 ? `$${sub.amount.toLocaleString()}` : "—"}</td>
                  <td className="px-5 py-4 text-sm text-[#94A3B8] whitespace-nowrap">
                    {sub.renewal ? new Date(sub.renewal).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-block rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusStyles[sub.status] ?? "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}