// src/components/dealers/DealersGrid.tsx
"use client";

import { useState, useMemo } from "react";
import DealersFilters from "./DealersFilters";
import DealerCard from "./DealerCard";
import { dealers } from "./dealersData";

const PAGE_SIZE = 6;

export default function DealersGrid() {
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedSort, setSelectedSort] = useState("Highest Rated");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredDealers = useMemo(() => {
    let result = [...dealers];

    // Filter by location
    if (selectedLocation !== "All Locations") {
      result = result.filter(
        (d) => `${d.city}, ${d.state}` === selectedLocation
      );
    }

    // Sort
    if (selectedSort === "Highest Rated") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === "Most Vehicles") {
      result.sort((a, b) => b.inventoryCount - a.inventoryCount);
    } else if (selectedSort === "Most Reviews") {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [selectedLocation, selectedSort]);

  const totalPages = Math.ceil(filteredDealers.length / PAGE_SIZE);
  const paginatedDealers = filteredDealers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleLocationChange = (loc: string) => {
    setSelectedLocation(loc);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    setCurrentPage(1);
  };

  return (
    <div>
      <DealersFilters
        selectedLocation={selectedLocation}
        onLocationChange={handleLocationChange}
        selectedSort={selectedSort}
        onSortChange={handleSortChange}
        resultCount={filteredDealers.length}
      />

      {/* Grid */}
      {paginatedDealers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedDealers.map((dealer, index) => (
            <DealerCard key={dealer.id} dealer={dealer} index={index} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#262626] bg-[#171717] py-16 text-center">
          <p className="text-[#94A3B8]">No dealerships found in this location.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-[#262626] bg-[#171717] px-4 py-2 text-sm font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#2d3d5e] transition-colors"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-10 w-10 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === page
                  ? "bg-[#FC5E01] text-white"
                  : "border border-[#262626] bg-[#171717] text-[#94A3B8] hover:text-white hover:border-[#2d3d5e]"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-[#262626] bg-[#171717] px-4 py-2 text-sm font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#2d3d5e] transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}