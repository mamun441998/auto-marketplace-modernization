// src/components/about/AboutStats.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, CarFront, TrendingUp, Users } from "lucide-react";

interface StatItem {
  icon: typeof Building2;
  value: string;
  numericValue?: number;
  suffix: string;
  isNumeric: boolean;
  label: string;
}

const stats: StatItem[] = [
  { icon: Building2, value: "530+", numericValue: 530, suffix: "+", isNumeric: true, label: "Active Dealerships" },
  { icon: CarFront, value: "15K+", numericValue: 15, suffix: "K+", isNumeric: true, label: "Vehicles Managed" },
  { icon: TrendingUp, value: "98%", numericValue: 98, suffix: "%", isNumeric: true, label: "Avg. Sales Growth" },
  { icon: Users, value: "24/7", suffix: "", isNumeric: false, label: "Dedicated Support" },
];

function Counter({ value, numericValue, suffix, isNumeric }: { value: string; numericValue?: number; suffix: string; isNumeric: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView || !isNumeric || numericValue === undefined) return;

    let start = 0;
    const end = numericValue;
    const duration = 2000; // 2 seconds
    const incrementTime = Math.max(Math.floor(duration / end), 20);

    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / incrementTime));
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, numericValue, isNumeric]);

  return (
    <span ref={ref}>
      {isNumeric ? `${count}${suffix}` : value}
    </span>
  );
}

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
              <Counter 
                value={stat.value} 
                numericValue={stat.numericValue} 
                suffix={stat.suffix} 
                isNumeric={stat.isNumeric} 
              />
            </h3>
            <p className="mt-1 text-sm text-[#94A3B8]">{stat.label}</p>
          </div>
        );
      })}
    </motion.div>
  );
}