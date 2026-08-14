"use client";

import { Search, ChevronDown } from "lucide-react";

interface DealerFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  resultCount: number;
}

const statusOptions = [
  { v: "all", l: "All Status" },
  { v: "active", l: "Active" },
  { v: "pending", l: "Pending" },
  { v: "suspended", l: "Suspended" },
];

export default function DealerFilters({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  resultCount,
}: DealerFiltersProps) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex items-center gap-2 rounded-xl border border-[#1e2a4a] bg-[#111B33] px-4 py-2.5 w-full max-w-md">
        <Search size={16} className="text-[#64748B]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by dealer name, owner or email..."
          className="w-full bg-transparent text-sm text-white placeholder:text-[#64748B] focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#94A3B8]">
          Showing <span className="font-bold text-white">{resultCount}</span> dealers
        </p>

        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="appearance-none rounded-xl border border-[#1e2a4a] bg-[#111B33] pl-4 pr-9 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-[#FC5E01] cursor-pointer"
          >
            {statusOptions.map((o) => (
              <option key={o.v} value={o.v} className="bg-[#0A0F1E]">
                {o.l}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}