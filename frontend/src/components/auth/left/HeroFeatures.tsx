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
            className="flex w-[80%] items-start gap-4"
          >
            {/* Icon */}
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-[#EC5707]/20
                bg-[#1B2A49]
                shadow-lg
                shadow-black/20
              "
            >
              <Icon
                size={18}
                className="text-[#EC5707]"
              />
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <h3
                className="
                  text-[16px]
                  font-bold
                  text-white
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-1
                  w-full
                  overflow-hidden
                  text-ellipsis
                  whitespace-nowrap
                  text-[14px]
                  leading-6
                  text-slate-300
                "
              >
                {item.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}