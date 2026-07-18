// src/components/dealers/DealersCTA.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function DealersCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl border border-[#262626] bg-gradient-to-br from-[#171717] to-[#141414] px-8 py-16 text-center sm:px-16"
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#FC5E01]/20 blur-3xl" />

      <div className="relative">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Own A Dealership?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[#94A3B8]">
          List your dealership on MotoHave and start managing inventory,
          leads and your website from one powerful platform.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-[#FC5E01] px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#E55A00] active:scale-[0.985]"
          >
            Start Free Trial
          </Link>
          <Link
            href="/pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-[#262626] bg-transparent px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#1a263f] hover:border-[#FC5E01]"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </motion.div>
  );
}