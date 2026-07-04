"use client";

import {
  LayoutDashboard,
  CarFront,
  Users,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Smart Dashboard",
    desc: "Real-time insights & performance overview.",
  },
  {
    icon: CarFront,
    title: "Inventory Management",
    desc: "Manage cars, stock, and stay organized.",
  },
  {
    icon: Users,
    title: "Leads & Sales Tracking",
    desc: "Track follow-ups and boost lead conversions.",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    desc: "Make data-driven decisions with analytics.",
  },
];

export default function HeroFeatures() {
  return (
    <div className="flex w-full -translate-y-8 flex-col items-end space-y-5 overflow-hidden">
      {features.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex w-[80%] items-start gap-3"
          >
            {/* Icon */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white bg-white shadow-lg">
              <Icon size={14} className="text-blue-600" />
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-bold text-blue-700">
                {item.title}
              </h3>
              <p className="mt-1 w-full overflow-hidden text-ellipsis whitespace-nowrap text-[13px] leading-6 text-blue-500">
                {item.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}