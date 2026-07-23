// src/components/home/Everything/EverythingHeader.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export default function EverythingHeader() {
  return (
    <div className="relative z-10 max-w-4xl mx-auto text-center px-4 pb-12 md:pb-14 select-none">
      {/* Ambient orange glow, consistent with brand */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#FC5E01]/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#262626] bg-[#171717]"
      >
        <span className="flex h-1.5 w-1.5 rounded-full bg-[#FC5E01] animate-pulse" />
        <span className="text-[11px] font-bold tracking-wider uppercase text-white/70">
          One Platform. Every Tool.
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight whitespace-nowrap"
      >
        Everything You Need To Run A <br className="block sm:hidden" />
        <span className="text-[#FC5E01]">Modern Dealership</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3 text-[#94A3B8] text-sm md:text-base max-w-2xl mx-auto font-normal leading-relaxed"
      >
        Replace multiple disconnected systems with one intelligent platform. Manage inventory,
        customers, websites, marketing, payments and AI automation from a single dashboard.
      </motion.p>
    </div>
  );
}