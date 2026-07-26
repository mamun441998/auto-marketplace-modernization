"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Eye, Trash2, CarFront, Loader2 } from "lucide-react";
import InventoryFilters from "./InventoryFilters";
import EmptyState from "@/components/shared/EmptyState";
import { fetchMyVehicles, deleteVehicle, Vehicle } from "@/lib/vehicle";

/** Map backend status -> display label + colour. */
const statusMap: Record<string, { label: string; className: string }> = {
  active:   { label: "In Stock", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  pending:  { label: "Reserved", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  sold:     { label: "Sold",     className: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
  draft:    { label: "Draft",    className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  archived: { label: "Archived", className: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
};

function statusInfo(status: string) {
  return statusMap[status] ?? {
    label: status,
    className: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };
}

/** Thumbnail that falls back to an emoji if the image is missing/broken. */
function Thumb({ src }: { src?: string | null }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <span className="text-sm">🚗</span>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className="h-full w-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}

const PAGE_SIZE = 6;

export default function VehicleTable() {
  const router = useRouter();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedBodyType, setSelectedBodyType] = useState("All Types");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadVehicles = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await fetchMyVehicles({ per_page: 100, sort_by: "created_at", sort_dir: "desc" });
      if (res.success) {
        setVehicles(res.vehicles ?? []);
      } else {
        setLoadError((res as any).message || "Failed to load inventory.");
      }
    } catch (err) {
      console.error("Load inventory failed:", err);
      setLoadError("Something went wrong while loading your inventory.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.make?.toLowerCase().includes(q) ||
          v.model?.toLowerCase().includes(q) ||
          (v.vin ?? "").toLowerCase().includes(q)
      );
    }

    if (selectedStatus !== "All Status") {
      result = result.filter((v) => statusInfo(v.status).label === selectedStatus);
    }

    if (selectedBodyType !== "All Types") {
      result = result.filter(
        (v) => (v.body_type ?? "").toLowerCase() === selectedBodyType.toLowerCase()
      );
    }

    return result;
  }, [vehicles, searchQuery, selectedStatus, selectedBodyType]);

  const totalPages = Math.ceil(filteredVehicles.length / PAGE_SIZE);
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const goToDetail = (id: number) => router.push(`/inventory/${id}`);
  const goToEdit = (id: number) => router.push(`/inventory/${id}/edit`);

  const handleDelete = async (vehicle: Vehicle) => {
    if (!confirm(`Delete ${vehicle.make} ${vehicle.model}?`)) return;

    setDeletingId(vehicle.id);
    try {
      const res = await deleteVehicle(vehicle.id);
      if (res.success) {
        setVehicles((prev) => prev.filter((v) => v.id !== vehicle.id));
      } else {
        alert((res as any).message || "Failed to delete vehicle.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Something went wrong while deleting.");
    } finally {
      setDeletingId(null);
    }
  };

  /* ---- Loading ---- */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-[#1e2a4a] bg-[#111B33] py-20 text-[#94A3B8]">
        <Loader2 size={20} className="animate-spin mr-2" />
        Loading inventory...
      </div>
    );
  }

  /* ---- Error ---- */
  if (loadError) {
    return (
      <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-5 py-8 text-center">
        <p className="text-sm text-rose-300">{loadError}</p>
        <button
          onClick={loadVehicles}
          className="mt-4 rounded-lg border border-[#1e2a4a] bg-[#111B33] px-4 py-2 text-sm font-semibold text-white hover:border-[#2d3d5e] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  /* ---- Empty ---- */
  if (vehicles.length === 0) {
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

      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33]">
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
              {paginatedVehicles.map((vehicle) => {
                const s = statusInfo(vehicle.status);
                const thumb = vehicle.primary_image_url || vehicle.featured_image?.image_url;

                return (
                  <tr
                    key={vehicle.id}
                    onClick={() => goToDetail(vehicle.id)}
                    className={`group cursor-pointer border-b border-[#1e2a4a] last:border-0 hover:bg-[#0A0F1E]/50 ${
                      deletingId === vehicle.id ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#0A0F1E] overflow-hidden">
                          <Thumb src={thumb} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white truncate capitalize">
                            {vehicle.make} {vehicle.model}
                          </p>
                          <p className="text-[11px] text-[#64748B]">
                            {vehicle.year} · {vehicle.body_type ?? "—"} · {vehicle.fuel_type ?? "—"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs font-mono text-[#64748B]">{vehicle.vin ?? "—"}</td>
                    <td className="px-5 py-4 text-sm font-bold text-white">
                      {vehicle.price != null ? `$${Number(vehicle.price).toLocaleString()}` : "—"}
                    </td>
                    <td className="px-5 py-4 text-sm text-[#94A3B8]">
                      {vehicle.mileage != null ? `${(vehicle.mileage / 1000).toFixed(1)}K mi` : "—"}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-block rounded-full border px-2.5 py-1 text-[10px] font-bold ${s.className}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); goToDetail(vehicle.id); }}
                          title="View Details"
                          className="rounded-lg p-2 text-[#94A3B8] hover:bg-[#0A0F1E] hover:text-white transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); goToEdit(vehicle.id); }}
                          title="Edit Vehicle"
                          className="rounded-lg p-2 text-blue-400 hover:bg-[#0A0F1E] transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(vehicle); }}
                          title="Delete"
                          className="rounded-lg p-2 text-rose-400 hover:bg-[#0A0F1E] transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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