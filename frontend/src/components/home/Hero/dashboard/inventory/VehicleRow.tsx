"use client";

import { MoreHorizontal } from "lucide-react";

interface VehicleRowProps {
  car: {
    id: number;
    image: string;
    vehicle: string;
    year: number;
    price: string;
    mileage: string;
    status: string;
  };
}

export default function VehicleRow({
  car,
}: VehicleRowProps) {
  return (
    <tr className="transition-colors hover:bg-slate-50">
      {/* Vehicle */}

      <td className="px-4 py-2.5">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={car.image}
            alt={car.vehicle}
            className="
              h-10
              w-16
              shrink-0
              rounded-md
              border
              border-slate-200
              object-cover
            "
          />

          <div className="min-w-0">
            <h4 className="truncate text-sm font-semibold text-slate-900">
              {car.vehicle}
            </h4>

            <p className="mt-0.5 text-[11px] text-slate-500">
              #{car.id.toString().padStart(4, "0")}
            </p>
          </div>
        </div>
      </td>

      {/* Year */}

      <td className="hidden px-2 py-2.5 text-sm font-medium text-slate-700 sm:table-cell">
        {car.year}
      </td>

      {/* Price */}

      <td className="px-2 py-2.5 text-sm font-bold text-slate-900">
        {car.price}
      </td>

      {/* Mileage */}

      <td className="hidden px-2 py-2.5 text-sm text-slate-600 md:table-cell">
        {car.mileage}
      </td>

      {/* Status */}

      <td className="px-2 py-2.5">
        <span
          className={`
            inline-flex
            items-center
            justify-center

            rounded-full

            px-2.5
            py-1

            text-[10px]
            font-bold

            whitespace-nowrap

            ${
              car.status === "Available"
                ? "bg-emerald-100 text-emerald-700"
                : car.status === "Reserved"
                ? "bg-amber-100 text-amber-700"
                : "bg-slate-200 text-slate-700"
            }
          `}
        >
          {car.status}
        </span>
      </td>

      {/* Action */}

      <td className="hidden px-2 py-2.5 sm:table-cell">
        <button
          className="
            flex
            h-8
            w-8
            items-center
            justify-center

            rounded-lg

            transition

            hover:bg-slate-100
          "
        >
          <MoreHorizontal size={15} />
        </button>
      </td>
    </tr>
  );
}