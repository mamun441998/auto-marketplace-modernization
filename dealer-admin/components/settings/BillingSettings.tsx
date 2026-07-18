// dealer-admin/components/settings/BillingSettings.tsx
"use client";

import { useState } from "react";
import { CreditCard, Download, Calendar, ArrowUpRight, ShieldCheck } from "lucide-react";
import UpdatePaymentMethodModal from "./UpdatePaymentMethodModal";

export default function BillingSettings() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const invoices = [
    { id: "INV-2026-007", date: "2026-07-01", amount: "$129.00", status: "Paid", method: "Visa •••• 4242" },
    { id: "INV-2026-006", date: "2026-06-01", amount: "$129.00", status: "Paid", method: "Visa •••• 4242" },
    { id: "INV-2026-005", date: "2026-05-01", amount: "$129.00", status: "Paid", method: "Visa •••• 4242" },
  ];

  return (
    <div className="bg-[#111B33] border border-[#1e2a4a] rounded-2xl p-6 space-y-6">
      <div>
        <h3 className="text-sm font-bold text-white">Billing & Invoices</h3>
        <p className="text-xs text-[#64748B] mt-0.5">Manage your payment method and view billing history.</p>
      </div>

      {/* Payment Method + Renewal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-gradient-to-br from-[#1e2a4a] to-[#0A0F1E] border border-[#1e2a4a] rounded-xl p-5 relative overflow-hidden flex flex-col justify-between h-40">
          <div className="absolute top-0 right-0 h-32 w-32 bg-[#FC5E01]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start justify-between">
            <div>
              <span className="block text-[10px] font-semibold uppercase text-[#64748B] tracking-wider">Payment Method</span>
              <span className="text-sm text-white font-semibold mt-1 block">Visa Card</span>
            </div>
            <CreditCard size={18} className="text-[#FC5E01]" />
          </div>
          <div className="space-y-1">
            <span className="block text-sm font-mono text-white tracking-widest">•••• •••• •••• 4242</span>
            <div className="flex items-center justify-between text-xs text-[#64748B] font-mono pt-1">
              <span>Exp: 12/29</span>
              <span className="flex items-center gap-1 text-emerald-400 font-sans font-semibold">
                <ShieldCheck size={11} /> Active
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#0A0F1E]/60 border border-[#1e2a4a] rounded-xl p-5 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
              <Calendar size={14} className="text-[#FC5E01]" />
              Next Billing Date
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed pt-1">
              Your subscription renews on <span className="text-white font-medium">Aug 1, 2026</span>. Your
              card ending in 4242 will be charged <span className="text-white font-medium">$129.00</span>{" "}
              automatically.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full text-center py-2.5 rounded-lg border border-[#1e2a4a] text-xs font-semibold text-[#94A3B8] bg-[#0A0F1E] hover:border-[#FC5E01]/40 hover:text-[#FC5E01] transition-colors flex items-center justify-center gap-1.5"
          >
            Update Payment Method
            <ArrowUpRight size={12} />
          </button>
        </div>
      </div>

      {/* Invoice History */}
      <div className="space-y-2 pt-2">
        <span className="text-xs font-semibold text-[#94A3B8] block">Invoice History</span>
        <div className="overflow-x-auto border border-[#1e2a4a] rounded-xl bg-[#0A0F1E]/40">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1e2a4a] bg-[#0A0F1E]/60 text-[#64748B] font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-3">Invoice ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2a4a]">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#0A0F1E]/40 transition-colors">
                  <td className="p-3 text-white font-semibold">{inv.id}</td>
                  <td className="p-3 text-[#94A3B8]">{inv.date}</td>
                  <td className="p-3 text-[#94A3B8]">{inv.method}</td>
                  <td className="p-3 text-white font-semibold">{inv.amount}</td>
                  <td className="p-3">
                    <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-500/20">
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="p-1.5 rounded-lg bg-[#0A0F1E] border border-[#1e2a4a] text-[#64748B] hover:text-white hover:border-[#FC5E01] transition-colors">
                      <Download size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UpdatePaymentMethodModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}