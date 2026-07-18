// dealer-admin/app/inventory/add/page.tsx
import { Metadata } from "next";
import AddVehicleForm from "@/components/inventory/AddVehicleForm";

export const metadata: Metadata = {
  title: "Add Vehicle",
};

export default function AddVehiclePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Add New Vehicle</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Fill in the details below to list a new vehicle in your inventory.
        </p>
      </div>

      <AddVehicleForm />
    </div>
  );
}