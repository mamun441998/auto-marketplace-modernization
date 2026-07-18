// dealer-admin/app/inventory/[id]/page.tsx
import { notFound } from "next/navigation";
import VehicleDetailHeader from "@/components/inventory/VehicleDetailHeader";
import VehicleGallery from "@/components/inventory/VehicleGallery";
import VehicleSpecs from "@/components/inventory/VehicleSpecs";
import { inventoryVehicles } from "@/lib/dealerData";

interface VehicleDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const { id } = await params;
  const vehicle = inventoryVehicles.find((v) => v.id === Number(id));

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <VehicleDetailHeader vehicle={vehicle} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        <VehicleGallery />
        <VehicleSpecs vehicle={vehicle} />
      </div>
    </div>
  );
}