"use client";

import { Plus } from "lucide-react";

export default function InventoryHeader() {
  return (
    <div className="flex items-center justify-between gap-3">
      {/* Left */}

      <div className="min-w-0">
        <h2 className="truncate text-xl font-extrabold tracking-tight text-slate-900">
          Vehicle Inventory
        </h2>

        <p className="mt-0.5 truncate text-xs text-slate-500">
          Manage all dealership vehicles from one place.
        </p>
      </div>

      {/* Action (matches every other module page) */}

      <button
        className="
          flex
          h-9
          shrink-0
          items-center
          gap-1.5

          rounded-lg

          bg-gradient-to-r
          from-blue-600
          to-cyan-500

          px-3

          text-xs
          font-bold
          text-white

          shadow-sm
          shadow-blue-500/20

          transition-all

          hover:-translate-y-0.5
        "
      >
        <Plus size={14} />
        Add Vehicle
      </button>
    </div>
  );
}
