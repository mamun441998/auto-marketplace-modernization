"use client";

import { motion } from "framer-motion";
import {
  Building2,
  CarFront,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import InfiniteMarquee from "./InfiniteMarquee";
import ParticleNetwork from "./ParticleNetwork";

const stats = [
  { icon: Building2, value: "530+", label: "Active Dealerships" },
  { icon: CarFront, value: "15K+", label: "Vehicles Managed" },
  { icon: TrendingUp, value: "98%", label: "Sales Growth" },
  { icon: ShieldCheck, value: "99%", label: "Customer Satisfaction" },
];

export default function Testimonials() {
  return (
    <section className="relative bg-[#0D0D10] py-20 lg:py-24 border-t border-[#262626]">
      {/* Background decoration with Canvas Particle Layer inside */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-[#FC5E01]/5 blur-3xl" />
        
        {/* Particle Network Animation Component */}
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
            Hundreds of dealerships trust MotoHave to manage
            inventory, customers, websites and sales every day.
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
          {stats.map((item) => {
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
                  {item.value}
                </h3>

                <p className="mt-1 text-xs sm:text-sm text-[#64748B]">
                  {item.label}
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* Single Row Auto Marquee */}
        <InfiniteMarquee />
      </div>
    </section>
  );
}