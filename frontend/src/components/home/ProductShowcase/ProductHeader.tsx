"use client";

import { motion } from "framer-motion";

export default function ProductHeader() {
  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto text-center select-none pb-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#262626] bg-[#171717]"
      >
        <span className="flex h-1.5 w-1.5 rounded-full bg-[#FC5E01] animate-pulse" />
        <span className="text-[10px] font-bold tracking-wider uppercase text-white/70">
          Product Overview
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-[1.1]"
      >
        Powerful Modules Built <span className="text-[#FC5E01]">For Modern Dealerships</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 text-[#94A3B8] text-sm md:text-base font-normal leading-relaxed"
      >
        MotoHave combines inventory, CRM, AI tools, payments and marketing into one
        intelligent, easy-to-use dealership management platform.
      </motion.p>
    </div>
  );
}