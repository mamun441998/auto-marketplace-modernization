"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical, Pencil, Eye, Trash2, CarFront } from "lucide-react";
import InventoryFilters from "./InventoryFilters";
import EmptyState from "@/components/shared/EmptyState";
import { inventoryVehicles, InventoryVehicle } from "@/lib/dealerData";

const statusStyles: Record<string, string> = {
  "In Stock": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Reserved: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Sold: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

const PAGE_SIZE = 6;

export default function VehicleTable() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedBodyType, setSelectedBodyType] = useState("All Types");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredVehicles = useMemo(() => {
    let result = [...inventoryVehicles];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.make.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.vin.toLowerCase().includes(q)
      );
    }

    if (selectedStatus !== "All Status") {
      result = result.filter((v) => v.status === selectedStatus);
    }

    if (selectedBodyType !== "All Types") {
      result = result.filter((v) => v.bodyType === selectedBodyType);
    }

    return result;
  }, [searchQuery, selectedStatus, selectedBodyType]);

  const totalPages = Math.ceil(filteredVehicles.length / PAGE_SIZE);
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleAction = (vehicle: InventoryVehicle, action: string) => {
    if (action === "view") {
      router.push(`/inventory/${vehicle.id}`);
      setOpenMenuId(null);
      return;
    }

    if (action === "edit") {
      router.push(`/inventory/${vehicle.id}/edit`);
      setOpenMenuId(null);
      return;
    }

    if (action === "delete") {
      if (confirm(`Delete ${vehicle.make} ${vehicle.model}?`)) {
        alert("Vehicle deleted (backend not connected yet)");
      }
    } else {
      alert(`Action "${action}" triggered for ${vehicle.make} ${vehicle.model} (backend not connected yet)`);
    }
    setOpenMenuId(null);
  };

  // Ekdomi kono vehicle nei (notun dealer)
  if (inventoryVehicles.length === 0) {
    return (
      <div>
        <InventoryFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedBodyType={selectedBodyType}
          onBodyTypeChange={setSelectedBodyType}
          resultCount={0}
        />
        <EmptyState
          icon={CarFront}
          title="No vehicles yet"
          description="Start building your inventory by adding your first vehicle listing."
          actionLabel="Add Your First Vehicle"
          actionHref="/inventory/add"
        />
      </div>
    );
  }

  return (
    <div>
      <InventoryFilters
        searchQuery={searchQuery}
        onSearchChange={(v) => { setSearchQuery(v); setCurrentPage(1); }}
        selectedStatus={selectedStatus}
        onStatusChange={(v) => { setSelectedStatus(v); setCurrentPage(1); }}
        selectedBodyType={selectedBodyType}
        onBodyTypeChange={(v) => { setSelectedBodyType(v); setCurrentPage(1); }}
        resultCount={filteredVehicles.length}
      />

      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] overflow-visible">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-[#1e2a4a]">
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Vehicle</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">VIN</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Price</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Mileage</th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Status</th>
                <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-b border-[#1e2a4a] last:border-0 hover:bg-[#0A0F1E]/50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${vehicle.gradient} text-sm`}>
                        🚗
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">
                          {vehicle.make} {vehicle.model}
                        </p>
                        <p className="text-[11px] text-[#64748B]">
                          {vehicle.year} · {vehicle.bodyType} · {vehicle.fuelType}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs font-mono text-[#64748B]">{vehicle.vin}</td>
                  <td className="px-5 py-4 text-sm font-bold text-white">${vehicle.price.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm text-[#94A3B8]">{(vehicle.mileage / 1000).toFixed(1)}K mi</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusStyles[vehicle.status]}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === vehicle.id ? null : vehicle.id)}
                      className="rounded-lg p-1.5 text-[#94A3B8] hover:bg-[#0A0F1E] hover:text-white transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {openMenuId === vehicle.id && (
                      <div
                        ref={menuRef}
                        className="absolute right-5 top-full z-20 mt-1 w-44 rounded-xl border border-[#1e2a4a] bg-[#0C1A32] p-1.5 shadow-xl text-left"
                      >
                        <button
                          onClick={() => handleAction(vehicle, "view")}
                          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white hover:bg-[#111B33] transition-colors"
                        >
                          <Eye size={15} className="text-[#94A3B8]" />
                          View Details
                        </button>
                        <button
                          onClick={() => handleAction(vehicle, "edit")}
                          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-blue-400 hover:bg-[#111B33] transition-colors"
                        >
                          <Pencil size={15} />
                          Edit Vehicle
                        </button>
                        <button
                          onClick={() => handleAction(vehicle, "delete")}
                          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-rose-400 hover:bg-[#111B33] transition-colors"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedVehicles.length === 0 && (
          <div className="py-16 text-center text-[#94A3B8]">No vehicles match your filters.</div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-[#1e2a4a] bg-[#111B33] px-4 py-2 text-sm font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#2d3d5e] transition-colors"
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
                  : "border border-[#1e2a4a] bg-[#111B33] text-[#94A3B8] hover:text-white hover:border-[#2d3d5e]"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-[#1e2a4a] bg-[#111B33] px-4 py-2 text-sm font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#2d3d5e] transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}