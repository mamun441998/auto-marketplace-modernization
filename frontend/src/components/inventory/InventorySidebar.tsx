// src/components/inventory/InventorySidebar.tsx
"use client";

import { X, SlidersHorizontal } from "lucide-react";
import { makes, bodyTypes, priceRanges, sortOptions } from "./inventoryData";

interface InventorySidebarProps {
  selectedMake: string;
  onMakeChange: (make: string) => void;
  selectedBodyType: string;
  onBodyTypeChange: (type: string) => void;
  selectedPriceRange: string;
  onPriceRangeChange: (range: string) => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
}

export default function InventorySidebar({
  selectedMake,
  onMakeChange,
  selectedBodyType,
  onBodyTypeChange,
  selectedPriceRange,
  onPriceRangeChange,
  selectedSort,
  onSortChange,
  isOpen,
  onClose,
  onReset,
}: InventorySidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`
          fixed lg:sticky top-0 lg:top-24 left-0 z-50 lg:z-0
          h-full lg:h-fit w-[280px] lg:w-full
          overflow-y-auto
          bg-[#0F0F0F] lg:bg-transparent
          border-r lg:border-r-0 border-[#262626]
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="rounded-none lg:rounded-2xl border-0 lg:border border-[#262626] bg-transparent lg:bg-[#171717] p-5 lg:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-[#FC5E01]" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Filters</h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onReset}
                className="text-xs font-semibold text-[#FC5E01] hover:text-[#E5540A] transition-colors"
              >
                Reset
              </button>
              <button onClick={onClose} className="lg:hidden text-[#94A3B8] hover:text-white">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Make Filter */}
          <div className="mb-6">
            <label className="mb-2.5 block text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Make
            </label>
            <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
              {makes.map((make) => (
                <button
                  key={make}
                  onClick={() => onMakeChange(make)}
                  className={`text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                    selectedMake === make
                      ? "bg-[#FC5E01]/10 text-[#FC5E01] font-semibold"
                      : "text-[#94A3B8] hover:bg-[#0A0A0A] hover:text-white"
                  }`}
                >
                  {make}
                </button>
              ))}
            </div>
          </div>

          {/* Body Type Filter */}
          <div className="mb-6">
            <label className="mb-2.5 block text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Body Type
            </label>
            <div className="flex flex-wrap gap-2">
              {bodyTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => onBodyTypeChange(type)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    selectedBodyType === type
                      ? "border-[#FC5E01] bg-[#FC5E01]/10 text-[#FC5E01]"
                      : "border-[#262626] bg-[#0A0A0A] text-[#94A3B8] hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <label className="mb-2.5 block text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Price Range
            </label>
            <div className="flex flex-col gap-1.5">
              {priceRanges.map((range) => (
                <button
                  key={range.label}
                  onClick={() => onPriceRangeChange(range.label)}
                  className={`text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                    selectedPriceRange === range.label
                      ? "bg-[#FC5E01]/10 text-[#FC5E01] font-semibold"
                      : "text-[#94A3B8] hover:bg-[#0A0A0A] hover:text-white"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="mb-2.5 block text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Sort By
            </label>
            <select
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full rounded-lg border border-[#262626] bg-[#0A0A0A] px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option} className="bg-[#0A0A0A]">
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </aside>
    </>
  );
}