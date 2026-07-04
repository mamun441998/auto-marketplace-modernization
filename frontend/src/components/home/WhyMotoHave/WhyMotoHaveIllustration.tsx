"use client";

import {
  CarFront,
  Users,
  Globe,
  Megaphone,
  BarChart3,
  Sparkles,
} from "lucide-react";

const cards = [
  {
    title: "Inventory",
    icon: CarFront,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "CRM",
    icon: Users,
    color: "bg-violet-100 text-violet-600",
  },
  {
    title: "Website",
    icon: Globe,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    title: "Marketing",
    icon: Megaphone,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    color: "bg-emerald-100 text-emerald-600",
  },
];

export default function WhyMotoHaveIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[430px]">
      {/* Glow - স্ট্যাটিক রাখা হয়েছে */}
      <div className="absolute inset-0 rounded-full bg-blue-300/20 blur-[90px]" />

      <div
        className="
          relative
          rounded-[28px]
          border
          border-slate-200
          bg-white/90
          backdrop-blur
          p-6
          shadow-[0_30px_80px_rgba(37,99,235,0.12)]
        "
      >
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              text-white
            "
          >
            <Sparkles size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              MotoHave Platform
            </h3>
            <p className="text-sm text-slate-500">Everything Connected</p>
          </div>
        </div>

        {/* Workflow */}
        <div className="space-y-2">
          {cards.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={item.title}>
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-slate-100
                    bg-slate-50
                    px-4
                    py-3
                  "
                >
                  <div className="flex items-center gap-3">
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
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500">Connected</p>
                    </div>
                  </div>
                  <span
                    className="
                      rounded-full
                      bg-emerald-100
                      px-2.5
                      py-1
                      text-[10px]
                      font-semibold
                      text-emerald-700
                    "
                  >
                    Active
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          className="
            mt-6
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            via-blue-500
            to-cyan-500
            py-4
            text-center
            text-white
          "
        >
          <h4 className="text-base font-bold">One Login</h4>
          <p className="mt-1 text-sm text-blue-100">
            One Platform • Unlimited Growth
          </p>
        </div>
      </div>
    </div>
  );
}