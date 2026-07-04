"use client";

import {
  DollarSign,
  Car,
  Users,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Revenue",
    value: "$1.24M",
    growth: "+18%",
    icon: DollarSign,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Inventory",
    value: "326",
    growth: "+12",
    icon: Car,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Customers",
    value: "2,845",
    growth: "+8%",
    icon: Users,
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    title: "Growth",
    value: "24%",
    growth: "+5%",
    icon: TrendingUp,
    color: "from-orange-500 to-red-500",
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white

              p-4

              shadow-sm
            "
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-xs text-slate-500">
                {item.title}
              </span>

              <div
                className={`
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center

                  rounded-xl

                  bg-gradient-to-r
                  ${item.color}

                  text-white
                `}
              >
                <Icon size={16} />
              </div>
            </div>

            <h2 className="mt-3 text-[20px] font-bold text-slate-900">
              {item.value}
            </h2>

            <p className="mt-1 text-sm font-semibold text-emerald-600">
              {item.growth}
            </p>
          </div>
        );
      })}
    </div>
  );
}