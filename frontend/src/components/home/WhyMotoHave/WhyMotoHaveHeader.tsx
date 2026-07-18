"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

export default function WhyMotoHaveHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7 }}
      className="mx-auto max-w-3xl text-center"
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.45 }}
        className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#171717] px-4 py-2 text-xs font-semibold tracking-wide text-white/80"
      >
        <BadgeCheck size={15} className="text-[#FC5E01]" />
        Why Dealers Choose MotoHave
      </motion.div>

      {/* Heading */}
      <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-white">
        Built For Modern
        <span className="block text-[#FC5E01]">Automotive Dealerships</span>
      </h2>

      {/* Description */}
      <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base leading-7 text-[#94A3B8]">
        Replace multiple dealership software with one intelligent platform.
        Manage inventory, CRM, website, marketing and analytics from a
        single dashboard designed to help you sell more vehicles with less
        effort.
      </p>

      {/* Accent Line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 90 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="mx-auto mt-7 h-1 rounded-full bg-[#FC5E01]"
      />
    </motion.div>
  );
}