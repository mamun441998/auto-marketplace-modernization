// dealer-admin/components/inventory/VehicleDetailHeader.tsx
"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import { InventoryVehicle } from "@/lib/dealerData";

interface VehicleDetailHeaderProps {
  vehicle: InventoryVehicle;
}

const statusStyles: Record<string, string> = {
  "In Stock": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Reserved: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Sold: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

export default function VehicleDetailHeader({ vehicle }: VehicleDetailHeaderProps) {
  const router = useRouter();

  const handleDelete = () => {
    // 💡 Backend connect korar somoy: eikhane API call hobe
    // jemon: await fetch(`/api/vehicles/${vehicle.id}`, { method: "DELETE" })
    if (confirm(`Delete ${vehicle.make} ${vehicle.model}?`)) {
      alert("Vehicle deleted (backend not connected yet)");
      router.push("/inventory");
    }
  };

 const handleEdit = () => {
  router.push(`/inventory/${vehicle.id}/edit`);
};

  return (
    <div>
      <button
        onClick={() => router.push("/inventory")}
        className="flex items-center gap-1.5 text-sm text-[#94A3B8] hover:text-white transition-colors mb-4"
      >
        <ChevronLeft size={16} />
        Back to Inventory
      </button>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-white">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${statusStyles[vehicle.status]}`}>
              {vehicle.status}
            </span>
          </div>
          <p className="text-sm text-[#64748B] font-mono">VIN: {vehicle.vin}</p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <p className="text-2xl font-extrabold text-[#FC5E01]">${vehicle.price.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={handleEdit}
          className="flex items-center gap-2 rounded-xl border border-[#1e2a4a] bg-[#111B33] px-4 py-2.5 text-sm font-semibold text-white hover:border-[#2d3d5e] transition-colors"
        >
          <Pencil size={15} />
          Edit Vehicle
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-400 hover:bg-rose-500/20 transition-colors"
        >
          <Trash2 size={15} />
          Delete
        </button>
      </div>
    </div>
  );
}