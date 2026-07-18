// src/components/dealers/DealersHero.tsx
"use client";

import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";

export default function DealersHero() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center px-4 pt-28 pb-14 sm:pt-32 sm:pb-16">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#171717] px-4 py-2"
      >
        <span className="h-2 w-2 rounded-full bg-[#FC5E01] animate-pulse" />
        <span className="text-sm font-medium text-white/80">530+ Verified Dealerships</span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl"
      >
        Find A Dealership <span className="text-[#FC5E01]">Near You</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 max-w-xl text-lg text-[#94A3B8]"
      >
        Browse verified dealerships on MotoHave and explore their live vehicle inventory.
      </motion.p>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 w-full max-w-xl"
      >
        <div className="flex items-center gap-2 rounded-2xl border border-[#262626] bg-[#171717] p-2 shadow-lg">
          <div className="flex flex-1 items-center gap-2 px-3">
            <Search size={18} className="text-[#64748B] flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by dealership name..."
              className="w-full bg-transparent py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none"
            />
          </div>
          <div className="hidden sm:flex items-center gap-2 border-l border-[#262626] px-3">
            <MapPin size={18} className="text-[#64748B] flex-shrink-0" />
            <span className="text-sm text-[#64748B]">All Locations</span>
          </div>
          <button className="flex-shrink-0 rounded-xl bg-[#FC5E01] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#E55A00]">
            Search
          </button>
        </div>
      </motion.div>
    </div>
  );
}