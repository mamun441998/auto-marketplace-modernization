"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronDown, Download, Receipt, Loader2 } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";
import { fetchTransactions, type DealerTransaction } from "@/lib/dealerTransactions";

const statusStyles: Record<string, string> = {
  Completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Refunded: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  Failed: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

const statusOptions = ["All Status", "Completed", "Pending", "Refunded", "Failed"];

const GRADIENTS = [
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-fuchsia-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-sky-500 to-blue-600",
  "from-pink-500 to-rose-500",
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function cap(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export default function TransactionsTable() {
  const [rows, setRows] = useState<DealerTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  useEffect(() => {
    fetchTransactions().then((res) => {
      if (res.success) setRows(res.transactions);
      setLoading(false);
    });
  }, []);

  const filteredTransactions = useMemo(() => {
    if (selectedStatus === "All Status") return rows;
    return rows.filter((t) => cap(t.status) === selectedStatus);
  }, [selectedStatus, rows]);

  const handleExport = () => {
    const header = ["Customer", "Email", "Vehicle", "Amount", "Method", "Status", "Date"];
    const lines = filteredTransactions.map((t) =>
      [
        t.customer_name,
        t.customer_email ?? "",
        t.vehicle,
        t.amount,
        t.method,
        cap(t.status),
        t.date ? new Date(t.date).toLocaleDateString() : "",
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [header.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Filters */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-sm text-[#94A3B8]">
          Showing{" "}
          <span className="font-bold text-white">{filteredTransactions.length}</span>{" "}
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
                <option key={status} value={status} className="bg-[#0A0F1E]">
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
        {loading ? (
          <div className="flex items-center justify-center py-16 text-[#64748B]">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        ) : (
          <>
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
                  {filteredTransactions.map((txn) => {
                    const status = cap(txn.status);
                    return (
                      <tr
                        key={txn.id}
                        className="border-b border-[#1e2a4a] last:border-0 hover:bg-[#0A0F1E]/50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${
                                GRADIENTS[txn.id % GRADIENTS.length]
                              } text-[11px] font-bold text-white`}
                            >
                              {initials(txn.customer_name)}
                            </div>
                            <p className="truncate text-sm font-semibold text-white">
                              {txn.customer_name}
                            </p>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-[#94A3B8]">{txn.vehicle}</td>

                        <td className="px-5 py-4 text-sm font-bold text-white">
                          ${txn.amount.toLocaleString()}
                        </td>

                        <td className="px-5 py-4 text-sm text-[#94A3B8]">{txn.method}</td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-block rounded-full border px-2.5 py-1 text-[10px] font-bold ${
                              statusStyles[status] ??
                              "bg-slate-500/10 text-slate-400 border-slate-500/20"
                            }`}
                          >
                            {status}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-right text-xs text-[#64748B]">
                          {txn.date
                            ? new Date(txn.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredTransactions.length === 0 && rows.length === 0 && (
              <EmptyState
                icon={Receipt}
                title="No transactions yet"
                description="Payments from your customers will appear here once you close your first deal."
              />
            )}

            {filteredTransactions.length === 0 && rows.length > 0 && (
              <div className="py-16 text-center text-[#94A3B8]">
                No transactions match this filter.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}