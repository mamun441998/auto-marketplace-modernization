// admin/components/security/SecurityLogsTable.tsx
"use client";

import { useState, useMemo } from "react";
import { ChevronDown, LogIn, Settings2, MapPin } from "lucide-react";
import { securityLogs } from "./securityData";

const statusStyles: Record<string, string> = {
  Success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Failed: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Suspicious: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

const typeOptions = ["All Types", "Login", "Admin Action"];
const statusOptions = ["All Status", "Success", "Failed", "Suspicious"];

export default function SecurityLogsTable() {
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const filteredLogs = useMemo(() => {
    let result = [...securityLogs];

    if (selectedType !== "All Types") {
      result = result.filter((log) => log.type === selectedType);
    }

    if (selectedStatus !== "All Status") {
      result = result.filter((log) => log.status === selectedStatus);
    }

    return result;
  }, [selectedType, selectedStatus]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <p className="text-sm text-[#94A3B8]">
          Showing <span className="font-bold text-white">{filteredLogs.length}</span> log entries
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="appearance-none rounded-xl border border-[#1e2a4a] bg-[#111B33] pl-4 pr-9 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-[#FC5E01] cursor-pointer"
            >
              {typeOptions.map((type) => (
                <option key={type} value={type} className="bg-[#0A0F1E]">
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none rounded-xl border border-[#1e2a4a] bg-[#111B33] pl-4 pr-9 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-[#FC5E01] cursor-pointer"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status} className="bg-[#0A0F1E]">
                  {status}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-[#1e2a4a]">
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Type</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">User</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Action</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">IP / Location</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Status</th>
                <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b border-[#1e2a4a] last:border-0 hover:bg-[#0A0F1E]/50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {log.type === "Login" ? (
                        <LogIn size={14} className="text-blue-400" />
                      ) : (
                        <Settings2 size={14} className="text-violet-400" />
                      )}
                      <span className="text-xs font-semibold text-[#94A3B8]">{log.type}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-semibold text-white">{log.userName}</p>
                      <p className="text-[11px] text-[#64748B]">{log.userEmail}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 max-w-[280px]">
                    <p className="text-sm text-[#94A3B8]">{log.action}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-xs font-mono text-[#94A3B8]">{log.ipAddress}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={11} className="text-[#475569]" />
                      <p className="text-[11px] text-[#64748B]">{log.location}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-block rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusStyles[log.status]}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right text-xs text-[#64748B] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="py-16 text-center text-[#94A3B8]">No logs match your filters.</div>
        )}
      </div>
    </div>
  );
}