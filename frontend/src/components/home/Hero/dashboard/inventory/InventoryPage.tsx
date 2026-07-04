"use client";

import InventoryHeader from "./InventoryHeader";
import InventoryStats from "./InventoryStats";
import InventoryTable from "./InventoryTable";

export default function InventoryPage() {
  return (
    <div
      className="
        flex
        h-full
        flex-col
        gap-3
      "
    >
      {/* Header */}

      <InventoryHeader />

      {/* Stats */}

      <InventoryStats />

      {/* Table */}

      <div className="min-h-0 flex-1 overflow-hidden">
        <InventoryTable />
      </div>
    </div>
  );
}