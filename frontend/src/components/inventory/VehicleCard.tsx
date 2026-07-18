// src/components/inventory/VehicleCard.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Gauge, Fuel, Settings2, MapPin } from "lucide-react";
import { Vehicle } from "./inventoryData";

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
}

export default function VehicleCard({ vehicle, index }: VehicleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-2xl border border-[#262626] bg-[#171717] transition-all duration-300 hover:border-[#2d3d5e] hover:shadow-xl hover:shadow-black/20"
    >
      {/* Image Placeholder */}
      <div className={`relative h-44 bg-gradient-to-br ${vehicle.gradient} flex items-center justify-center`}>
        <span className="text-5xl opacity-90">🚗</span>

        {vehicle.condition === "New" && (
          <span className="absolute top-3 left-3 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
            NEW
          </span>
        )}

        <span className="absolute top-3 right-3 rounded-full bg-black/40 backdrop-blur px-2.5 py-1 text-[10px] font-bold text-white">
          {vehicle.year}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-white group-hover:text-[#FC5E01] transition-colors">
            {vehicle.make} {vehicle.model}
          </h3>
        </div>

        <p className="mt-1 text-xl font-extrabold text-[#FC5E01]">
          ${vehicle.price.toLocaleString()}
        </p>

        {/* Specs */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-y border-[#262626] py-3">
          <div className="flex flex-col items-center gap-1 text-center">
            <Gauge size={15} className="text-[#64748B]" />
            <span className="text-[10px] font-semibold text-[#94A3B8]">
              {(vehicle.mileage / 1000).toFixed(1)}K mi
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center border-x border-[#262626]">
            <Fuel size={15} className="text-[#64748B]" />
            <span className="text-[10px] font-semibold text-[#94A3B8]">{vehicle.fuelType}</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <Settings2 size={15} className="text-[#64748B]" />
            <span className="text-[10px] font-semibold text-[#94A3B8]">{vehicle.transmission}</span>
          </div>
        </div>

        {/* Dealer + CTA */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#64748B] min-w-0">
            <MapPin size={13} className="flex-shrink-0" />
            <span className="truncate">{vehicle.dealerName}</span>
          </div>

          <Link
            href={`/inventory/${vehicle.id}`}
            className="flex-shrink-0 rounded-lg bg-[#FC5E01]/10 border border-[#FC5E01]/20 px-3 py-1.5 text-xs font-semibold text-[#FC5E01] transition-colors hover:bg-[#FC5E01] hover:text-white"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}