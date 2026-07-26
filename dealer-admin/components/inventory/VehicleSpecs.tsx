"use client";

import { Gauge, Fuel, Settings2, Calendar, Tag, Layers } from "lucide-react";
import { Vehicle } from "@/lib/vehicle";

interface VehicleSpecsProps {
  vehicle: Vehicle;
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  const specs = [
    { icon: Calendar, label: "Year", value: vehicle.year?.toString() ?? "—" },
    { icon: Layers, label: "Body Type", value: vehicle.body_type ?? "—" },
    {
      icon: Gauge,
      label: "Mileage",
      value: vehicle.mileage != null ? `${(vehicle.mileage / 1000).toFixed(1)}K mi` : "—",
    },
    { icon: Fuel, label: "Fuel Type", value: vehicle.fuel_type ?? "—" },
    { icon: Settings2, label: "Transmission", value: vehicle.transmission ?? "—" },
    { icon: Tag, label: "Added On", value: formatDate(vehicle.created_at) },
  ];

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <h3 className="text-sm font-bold text-white mb-5">Vehicle Specifications</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {specs.map((spec) => {
          const Icon = spec.icon;
          return (
            <div key={spec.label} className="rounded-xl border border-[#1e2a4a] bg-[#0A0F1E]/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} className="text-[#FC5E01]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">
                  {spec.label}
                </span>
              </div>
              <p className="text-sm font-bold text-white capitalize">{spec.value}</p>
            </div>
          );
        })}
      </div>

      {/* Description */}
      <div className="mt-5 pt-5 border-t border-[#1e2a4a]">
        <h4 className="text-xs font-semibold text-[#94A3B8] mb-2">Description</h4>
        <p className="text-sm text-[#94A3B8] leading-relaxed whitespace-pre-line">
          {vehicle.description?.trim()
            ? vehicle.description
            : `Well-maintained ${vehicle.year} ${vehicle.make} ${vehicle.model} with clean history.`}
        </p>
      </div>
    </div>
  );
}