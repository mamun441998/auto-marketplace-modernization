"use client";

import {
  Car,
  CheckCircle2,
  Clock3,
  DollarSign,
} from "lucide-react";

const stats = [
  {
    title: "Total Vehicles",
    value: "326",
    change: "+12 this week",
    icon: Car,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Available",
    value: "248",
    change: "76%",
    icon: CheckCircle2,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Reserved",
    value: "41",
    change: "13%",
    icon: Clock3,
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "Sold",
    value: "37",
    change: "+18%",
    icon: DollarSign,
    color: "bg-purple-100 text-purple-600",
  },
];

export default function InventoryStats() {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              min-w-0

              rounded-xl
              border
              border-slate-200
              bg-white

              px-3
              py-2.5

              shadow-sm
            "
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="truncate text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                {item.title}
              </span>

              <div
                className={`
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center

                  rounded-lg

                  ${item.color}
                `}
              >
                <Icon
                  size={15}
                  strokeWidth={2.3}
                />
              </div>
            </div>

            <div className="truncate text-xl font-extrabold leading-none text-slate-900">
              {item.value}
            </div>

            <p className="mt-1.5 truncate text-[10px] font-semibold text-emerald-600">
              {item.change}
            </p>
          </div>
        );
      })}
    </div>
  );
}