// dealer-admin/components/payments/TransactionsTable.tsx
"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Download, Receipt } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";
import { transactions } from "@/lib/dealerData";

const statusStyles: Record<string, string> = {
  Completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Refunded: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

const statusOptions = ["All Status", "Completed", "Pending", "Refunded"];

export default function TransactionsTable() {
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const filteredTransactions = useMemo(() => {
    if (selectedStatus === "All Status") return transactions;
    return transactions.filter((t) => t.status === selectedStatus);
  }, [selectedStatus]);

  const handleExport = () => {
    // Backend connect korar somoy: ekhane CSV/PDF export API call hobe
    alert("Exporting transactions (backend not connected yet)");
  };

  return (
    <div>
      {/* Filters */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-sm text-[#94A3B8]">
          Showing{" "}
          <span className="font-bold text-white">
            {filteredTransactions.length}
          </span>{" "}
          transactions
        </p>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none rounded-xl border border-[#1e2a4a] bg-[#111B33] pl-4 pr-9 py-2.5 text-sm font-medium text-white focus:border-[#FC5E01] focus:outline-none cursor-pointer"
            >
              {statusOptions.map((status) => (
                <option
                  key={status}
                  value={status}
                  className="bg-[#0A0F1E]"
                >
                  {status}
                </option>
              ))}
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
            />
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-xl border border-[#1e2a4a] bg-[#111B33] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#2d3d5e]"
          >
            <Download size={15} />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-[#1e2a4a] bg-[#111B33]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead>
              <tr className="border-b border-[#1e2a4a]">
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                  Customer
                </th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                  Vehicle
                </th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                  Amount
                </th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                  Method
                </th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                  Status
                </th>
                <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="border-b border-[#1e2a4a] last:border-0 hover:bg-[#0A0F1E]/50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${txn.gradient} text-[11px] font-bold text-white`}
                      >
                        {txn.avatarInitials}
                      </div>

                      <p className="truncate text-sm font-semibold text-white">
                        {txn.customerName}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-[#94A3B8]">
                    {txn.vehicleName}
                  </td>

                  <td className="px-5 py-4 text-sm font-bold text-white">
                    ${txn.amount.toLocaleString()}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#94A3B8]">
                    {txn.paymentMethod}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-block rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusStyles[txn.status]}`}
                    >
                      {txn.status}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-right text-xs text-[#64748B]">
                    {new Date(txn.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty States */}
        {filteredTransactions.length === 0 &&
          transactions.length === 0 && (
            <EmptyState
              icon={Receipt}
              title="No transactions yet"
              description="Payments from your customers will appear here once you close your first deal."
            />
          )}

        {filteredTransactions.length === 0 &&
          transactions.length > 0 && (
            <div className="py-16 text-center text-[#94A3B8]">
              No transactions match this filter.
            </div>
          )}
      </div>
    </div>
  );
}