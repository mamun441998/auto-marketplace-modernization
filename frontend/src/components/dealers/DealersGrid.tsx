"use client";

import { useState, useMemo, useEffect } from "react";
import DealersFilters from "./DealersFilters";
import DealerCard from "./DealerCard";
import { Dealer } from "./dealersData";
import { fetchDealers, type ApiDealer } from "@/lib/dealers";

const PAGE_SIZE = 6;

const GRADIENTS = [
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-fuchsia-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-sky-500 to-blue-600",
  "from-pink-500 to-rose-500",
];

function toDealer(d: ApiDealer): Dealer {
  const initials =
    d.name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "D";
  return {
    id: d.id,
    name: d.name,
    city: d.city || "",
    state: d.state || "",
    inventoryCount: d.vehicles_count ?? 0,
    avatarInitials: initials,
    gradient: GRADIENTS[d.id % GRADIENTS.length],
    verified: d.is_verified,
    logo: d.logo_url,
    slug: d.slug,
  };
}

export default function DealersGrid() {
  const [allDealers, setAllDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedSort, setSelectedSort] = useState("Most Vehicles");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetchDealers("?per_page=50");
      setAllDealers(res.dealers.map(toDealer));
      setLoading(false);
    })();
  }, []);

  const filteredDealers = useMemo(() => {
    let result = [...allDealers];

    if (selectedLocation !== "All Locations") {
      result = result.filter((d) => `${d.city}, ${d.state}` === selectedLocation);
    }

    if (selectedSort === "Most Vehicles") {
      result.sort((a, b) => b.inventoryCount - a.inventoryCount);
    } else if (selectedSort === "Most Reviews" || selectedSort === "Highest Rated") {
      result.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
    }

    return result;
  }, [allDealers, selectedLocation, selectedSort]);

  const totalPages = Math.ceil(filteredDealers.length / PAGE_SIZE);
  const paginatedDealers = filteredDealers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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

      {loading ? (
        <div className="rounded-2xl border border-[#262626] bg-[#171717] py-16 text-center">
          <p className="text-[#94A3B8]">Loading dealerships…</p>
        </div>
      ) : paginatedDealers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedDealers.map((dealer, index) => (
            <DealerCard key={dealer.id} dealer={dealer} index={index} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#262626] bg-[#171717] py-16 text-center">
          <p className="text-[#94A3B8]">No dealerships found yet.</p>
        </div>
      )}

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
                currentPage === page ? "bg-[#FC5E01] text-white" : "border border-[#262626] bg-[#171717] text-[#94A3B8] hover:text-white hover:border-[#2d3d5e]"
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