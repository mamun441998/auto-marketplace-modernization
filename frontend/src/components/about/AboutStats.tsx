// src/components/about/AboutStats.tsx
"use client";

import { motion } from "framer-motion";
import { Building2, CarFront, TrendingUp, Users } from "lucide-react";

const stats = [
  { icon: Building2, value: "530+", label: "Active Dealerships" },
  { icon: CarFront, value: "15K+", label: "Vehicles Managed" },
  { icon: TrendingUp, value: "98%", label: "Avg. Sales Growth" },
  { icon: Users, value: "24/7", label: "Dedicated Support" },
];

export default function AboutStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#262626] bg-[#171717] p-6 text-center shadow-sm"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#FC5E01]/10 text-[#FC5E01]">
              <Icon size={24} />
            </div>
            <h3 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white">
              {stat.value}
            </h3>
            <p className="mt-1 text-sm text-[#94A3B8]">{stat.label}</p>
          </div>
        );
      })}
    </motion.div>
  );
}