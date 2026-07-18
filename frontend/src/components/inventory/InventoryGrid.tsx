// src/components/inventory/InventoryGrid.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import InventorySidebar from "./InventorySidebar";
import VehicleCard from "./VehicleCard";
import { vehicles, priceRanges } from "./inventoryData";

const PAGE_SIZE = 9;

export default function InventoryGrid() {
  const searchParams = useSearchParams();
  const dealerIdParam = searchParams.get("dealer");

  const [selectedMake, setSelectedMake] = useState("All Makes");
  const [selectedBodyType, setSelectedBodyType] = useState("All Types");
  const [selectedPriceRange, setSelectedPriceRange] = useState("Any Price");
  const [selectedSort, setSelectedSort] = useState("Newest First");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dealerFilter, setDealerFilter] = useState<number | null>(null);

  // Detect dealer filter from URL (coming from Dealers page "View Inventory")
  useEffect(() => {
    if (dealerIdParam) {
      setDealerFilter(Number(dealerIdParam));
    }
  }, [dealerIdParam]);

  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];

    if (dealerFilter) {
      result = result.filter((v) => v.dealerId === dealerFilter);
    }

    if (selectedMake !== "All Makes") {
      result = result.filter((v) => v.make === selectedMake);
    }

    if (selectedBodyType !== "All Types") {
      result = result.filter((v) => v.bodyType === selectedBodyType);
    }

    const range = priceRanges.find((r) => r.label === selectedPriceRange);
    if (range) {
      result = result.filter((v) => v.price >= range.min && v.price <= range.max);
    }

    if (selectedSort === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "Lowest Mileage") {
      result.sort((a, b) => a.mileage - b.mileage);
    } else {
      result.sort((a, b) => b.year - a.year);
    }

    return result;
  }, [selectedMake, selectedBodyType, selectedPriceRange, selectedSort, dealerFilter]);

  const totalPages = Math.ceil(filteredVehicles.length / PAGE_SIZE);
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleReset = () => {
    setSelectedMake("All Makes");
    setSelectedBodyType("All Types");
    setSelectedPriceRange("Any Price");
    setSelectedSort("Newest First");
    setDealerFilter(null);
    setCurrentPage(1);
  };

  const dealerName = dealerFilter
    ? vehicles.find((v) => v.dealerId === dealerFilter)?.dealerName
    : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
      {/* Sidebar */}
      <InventorySidebar
        selectedMake={selectedMake}
        onMakeChange={(v) => { setSelectedMake(v); setCurrentPage(1); }}
        selectedBodyType={selectedBodyType}
        onBodyTypeChange={(v) => { setSelectedBodyType(v); setCurrentPage(1); }}
        selectedPriceRange={selectedPriceRange}
        onPriceRangeChange={(v) => { setSelectedPriceRange(v); setCurrentPage(1); }}
        selectedSort={selectedSort}
        onSortChange={(v) => { setSelectedSort(v); setCurrentPage(1); }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onReset={handleReset}
      />

      {/* Main Content */}
      <div>
        {/* Top Bar: Result count + Mobile filter button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-[#94A3B8]">
              Showing <span className="font-bold text-white">{filteredVehicles.length}</span> vehicles
            </p>
            {dealerName && (
              <p className="text-xs text-[#FC5E01] font-semibold mt-0.5">
                Filtered by dealer: {dealerName}
              </p>
            )}
          </div>

          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 rounded-xl border border-[#262626] bg-[#171717] px-4 py-2.5 text-sm font-medium text-white"
          >
            <SlidersHorizontal size={15} className="text-[#FC5E01]" />
            Filters
          </button>
        </div>

        {/* Grid */}
        {paginatedVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedVehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#262626] bg-[#171717] py-16 text-center">
            <p className="text-[#94A3B8]">No vehicles found matching your filters.</p>
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
    </div>
  );
}