"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, CarFront } from "lucide-react";
import AddVehicleForm from "@/components/inventory/AddVehicleForm";
import { fetchMyVehicle, Vehicle } from "@/lib/vehicle";

export default function EditVehiclePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    (async () => {
      setIsLoading(true);
      setNotFound(false);
      try {
        const res = await fetchMyVehicle(id);
        if (res.success && res.vehicle) {
          setVehicle(res.vehicle);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Load vehicle failed:", err);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-[#94A3B8]">
        <Loader2 size={20} className="animate-spin mr-2" />
        Loading vehicle...
      </div>
    );
  }

  if (notFound || !vehicle) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <CarFront size={40} className="text-[#64748B] mb-4" />
        <h2 className="text-lg font-bold text-white">Vehicle not found</h2>
        <p className="mt-1 text-sm text-[#94A3B8]">
          This vehicle may have been deleted or does not belong to you.
        </p>
        <button
          onClick={() => router.push("/inventory")}
          className="mt-5 rounded-xl bg-[#FC5E01] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors"
        >
          Back to Inventory
        </button>
      </div>
    );
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