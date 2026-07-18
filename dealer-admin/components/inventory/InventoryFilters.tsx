// dealer-admin/components/inventory/InventoryFilters.tsx
"use client";

import Link from "next/link";
import { Search, ChevronDown, Plus } from "lucide-react";

interface InventoryFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedBodyType: string;
  onBodyTypeChange: (type: string) => void;
  resultCount: number;
}

const statusOptions = ["All Status", "In Stock", "Reserved", "Sold"];
const bodyTypeOptions = ["All Types", "Sedan", "SUV", "Truck"];

export default function InventoryFilters({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedBodyType,
  onBodyTypeChange,
  resultCount,
}: InventoryFiltersProps) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 rounded-xl border border-[#1e2a4a] bg-[#111B33] px-4 py-2.5 w-full max-w-md">
          <Search size={16} className="text-[#64748B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by make, model or VIN..."
            className="w-full bg-transparent text-sm text-white placeholder:text-[#64748B] focus:outline-none"
          />
        </div>

        <Link
          href="/inventory/add"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#FC5E01] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors sm:ml-auto"
        >
          <Plus size={16} />
          Add Vehicle
        </Link>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-[#94A3B8]">
          Showing <span className="font-bold text-white">{resultCount}</span> vehicles
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
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

          <div className="relative">
            <select
              value={selectedBodyType}
              onChange={(e) => onBodyTypeChange(e.target.value)}
              className="appearance-none rounded-xl border border-[#1e2a4a] bg-[#111B33] pl-4 pr-9 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-[#FC5E01] cursor-pointer"
            >
              {bodyTypeOptions.map((type) => (
                <option key={type} value={type} className="bg-[#0A0F1E]">
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}