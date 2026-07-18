// dealer-admin/app/inventory/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import AddVehicleForm from "@/components/inventory/AddVehicleForm";
import { inventoryVehicles } from "@/lib/dealerData";

interface EditVehiclePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditVehiclePage({ params }: EditVehiclePageProps) {
  const { id } = await params;
  const vehicle = inventoryVehicles.find((v) => v.id === Number(id));

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Vehicle</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Update the details for {vehicle.make} {vehicle.model}.
        </p>
      </div>

      <AddVehicleForm vehicle={vehicle} />
    </div>
  );
}