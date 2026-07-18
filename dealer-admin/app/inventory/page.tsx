// dealer-admin/app/inventory/page.tsx
import { Metadata } from "next";
import InventoryStats from "@/components/inventory/InventoryStats";
import VehicleTable from "@/components/inventory/VehicleTable";

export const metadata: Metadata = {
  title: "Inventory",
};

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">Inventory Management</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Manage your vehicle listings, pricing and stock status.
        </p>
      </div>

      {/* Stats + Plan Usage */}
      <InventoryStats />

      {/* Vehicle Table */}
      <VehicleTable />
    </div>
  );
}