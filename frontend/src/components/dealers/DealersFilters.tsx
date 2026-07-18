// src/components/dealers/DealersFilters.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, MapPin, ArrowUpDown } from "lucide-react";
import { locations, sortOptions } from "./dealersData";

interface DealersFiltersProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
  resultCount: number;
}

export default function DealersFilters({
  selectedLocation,
  onLocationChange,
  selectedSort,
  onSortChange,
  resultCount,
}: DealersFiltersProps) {
  const [locationOpen, setLocationOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      {/* Result Count */}
      <p className="text-sm text-[#94A3B8]">
        Showing <span className="font-bold text-white">{resultCount}</span> dealerships
      </p>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Location Dropdown */}
        <div className="relative" ref={locationRef}>
          <button
            onClick={() => setLocationOpen(!locationOpen)}
            className="flex items-center gap-2 rounded-xl border border-[#262626] bg-[#171717] px-4 py-2.5 text-sm font-medium text-white hover:border-[#2d3d5e] transition-colors"
          >
            <MapPin size={15} className="text-[#FC5E01]" />
            {selectedLocation}
            <ChevronDown size={15} className={`transition-transform text-[#64748B] ${locationOpen ? "rotate-180" : ""}`} />
          </button>

          {locationOpen && (
            <div className="absolute right-0 sm:left-0 top-full z-20 mt-2 w-56 rounded-xl border border-[#262626] bg-[#171717] p-2 shadow-xl">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    onLocationChange(loc);
                    setLocationOpen(false);
                  }}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    selectedLocation === loc
                      ? "bg-[#FC5E01]/10 text-[#FC5E01] font-semibold"
                      : "text-[#94A3B8] hover:bg-[#0A0A0A] hover:text-white"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative" ref={sortRef}>
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 rounded-xl border border-[#262626] bg-[#171717] px-4 py-2.5 text-sm font-medium text-white hover:border-[#2d3d5e] transition-colors"
          >
            <ArrowUpDown size={15} className="text-[#FC5E01]" />
            {selectedSort}
            <ChevronDown size={15} className={`transition-transform text-[#64748B] ${sortOpen ? "rotate-180" : ""}`} />
          </button>

          {sortOpen && (
            <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-xl border border-[#262626] bg-[#171717] p-2 shadow-xl">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onSortChange(option);
                    setSortOpen(false);
                  }}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    selectedSort === option
                      ? "bg-[#FC5E01]/10 text-[#FC5E01] font-semibold"
                      : "text-[#94A3B8] hover:bg-[#0A0A0A] hover:text-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}