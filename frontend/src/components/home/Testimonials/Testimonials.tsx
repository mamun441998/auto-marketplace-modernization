"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, CarFront, ShieldCheck, TrendingUp } from "lucide-react";

import InfiniteMarquee from "./InfiniteMarquee";
import ParticleNetwork from "./ParticleNetwork";
import { fetchPlatformStats, type PlatformStats } from "@/lib/stats";

/* Animated count-up (runs once when scrolled into view) */
function CountUp({ target, suffix = "", duration = 1.4 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let startT: number | null = null;
    const step = (t: number) => {
      if (startT === null) startT = t;
      const p = Math.min(1, (t - startT) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Testimonials() {
  const [stats, setStats] = useState<PlatformStats>({ dealers: 0, vehicles: 0, leads: 0 });

  useEffect(() => {
    fetchPlatformStats().then(setStats);
  }, []);

  const items = [
    { icon: Building2, node: <CountUp target={stats.dealers} suffix="+" />, label: "Active Dealerships" },
    { icon: CarFront, node: <CountUp target={stats.vehicles} suffix="+" />, label: "Vehicles Managed" },
    { icon: TrendingUp, node: <CountUp target={stats.leads} suffix="+" />, label: "Leads Generated" },
    { icon: ShieldCheck, node: <>99%</>, label: "Customer Satisfaction" },
  ];

  return (
    <section className="relative bg-[#0D0D10] py-20 lg:py-24 border-t border-[#262626]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-[#FC5E01]/5 blur-3xl" />
        <ParticleNetwork />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center rounded-full border border-[#262626] bg-[#171717] px-5 py-2 text-sm font-semibold text-white/80">
            ⭐ Trusted By Dealers Worldwide
          </div>

          <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold text-white">
            Loved By
            <span className="mt-2 block text-[#FC5E01]">Modern Dealerships</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-8 text-[#94A3B8]">
            Dealerships trust MotoHave to manage inventory, customers, websites and sales every day.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-2xl border border-[#262626] bg-[#171717] p-4 sm:p-5 text-center shadow-sm"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#FC5E01]/10 text-[#FC5E01]">
                  <Icon size={20} />
                </div>

                <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
                  {item.node}
                </h3>

                <p className="mt-1 text-xs sm:text-sm text-[#64748B]">{item.label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Marquee */}
        <InfiniteMarquee />
      </div>
    </section>
  );
}