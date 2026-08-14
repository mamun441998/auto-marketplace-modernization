"use client";

import { DollarSign } from "lucide-react";
import type { PaymentRow } from "@/lib/adminBilling";

export default function RecentPaymentsTable({
  payments,
  collected,
  currency = "USD",
}: {
  payments: PaymentRow[];
  collected: number;
  currency?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Total collected */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
          <DollarSign className="w-5 h-5" />
        </div>
        <div>
          <p className="text-2xl font-extrabold text-white">
            ${collected.toLocaleString()}
          </p>
          <p className="text-xs text-[#64748B]">
            Total collected from subscriptions ({currency})
          </p>
        </div>
      </div>

      {/* Payments table */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1e2a4a] text-sm font-semibold text-white">
          Recent Payments
        </div>

        {payments.length === 0 ? (
          <div className="px-5 py-14 text-center text-sm text-[#64748B]">
            No subscription payments yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[#1e2a4a]">
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                    Dealer
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                    Plan
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                    Amount
                  </th>
                  <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-b border-[#1e2a4a] last:border-0 hover:bg-[#0A0F1E]/50">
                    <td className="px-5 py-4 text-sm font-semibold text-white">{p.dealer_name}</td>
                    <td className="px-5 py-4 text-sm text-[#94A3B8]">{p.plan}</td>
                    <td className="px-5 py-4 text-sm font-bold text-white">
                      ${p.amount.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-right text-xs text-[#64748B]">
                      {p.date
                        ? new Date(p.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}