// features/FeaturesHeader.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export const FeaturesHeader: React.FC = () => {
  return (
    <div className="relative z-10 max-w-3xl mx-auto text-center pt-0 pb-2 px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#FC5E01]/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#262626] bg-[#171717]"
      >
        <span className="text-[11px] font-bold tracking-wider uppercase text-white/70">
          ⚡ Automated Automotive SaaS
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-4 text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight"
      >
        Scale Your Dealership With <span className="text-[#FC5E01]">Advanced AI Solutions</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-3 text-[#94A3B8] text-sm md:text-base max-w-xl mx-auto font-normal leading-relaxed"
      >
        Real business outcomes — faster conversions, unified analytics, instant listings and secure closings, all in one platform.
      </motion.p>
    </div>
  );
};