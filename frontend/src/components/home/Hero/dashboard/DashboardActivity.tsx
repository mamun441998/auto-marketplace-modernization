"use client";

import {
  CarFront,
  UserPlus,
  Globe,
  DollarSign,
} from "lucide-react";

const activities = [
  {
    icon: CarFront,
    title: "BMW X5 Sold",
    time: "2 min ago",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: UserPlus,
    title: "New Lead",
    time: "5 min ago",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Globe,
    title: "Website Inquiry",
    time: "12 min ago",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: DollarSign,
    title: "Payment Received",
    time: "25 min ago",
    color: "bg-orange-100 text-orange-600",
  },
];

export default function DashboardActivity() {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between

          border-b
          border-slate-200

          px-5
          py-4
        "
      >
        <div>
          <h3 className="font-bold text-slate-900">
            Recent Activity
          </h3>

          <p className="text-xs text-slate-500">
            Live Updates
          </p>
        </div>

        <span
          className="
            rounded-full
            bg-emerald-100
            px-3
            py-1

            text-xs
            font-semibold
            text-emerald-600
          "
        >
          Live
        </span>
      </div>

      {/* List */}

      <div className="divide-y divide-slate-100">
        {activities.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                flex
                items-center
                gap-3

                px-5
                py-4

                hover:bg-slate-50
              "
            >
              <div
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center

                  rounded-xl

                  ${item.color}
                `}
              >
                <Icon size={18} />
              </div>

              <div className="flex-1">
                <p
                  className="
                    text-sm
                    font-semibold
                    text-slate-900
                  "
                >
                  {item.title}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500
                  "
                >
                  {item.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}