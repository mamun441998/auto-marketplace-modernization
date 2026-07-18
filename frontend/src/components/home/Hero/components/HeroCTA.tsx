"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex flex-wrap items-center justify-center gap-4"
    >
      {/* Start Free Trial */}
      <Link
        href="/register"
        className="
          inline-flex items-center gap-2 rounded-xl bg-[#38BDF8] px-7 py-3.5
          text-sm font-bold text-[#0F172A] transition-all duration-200
        "
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
          className="flex items-center gap-2"
        >
          Start Free Trial
          <ArrowRight size={18} />
        </motion.div>
      </Link>

      {/* Pricing - হোভারে ইনস্ট্যান্ট #30A2D5 কালার হবে */}
      <motion.div
        whileHover={{ backgroundColor: "#30A2D5", borderColor: "#30A2D5" }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="rounded-xl border border-[#2A2A2F] bg-transparent"
      >
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white"
        >
          View Pricing
        </Link>
      </motion.div>
    </motion.div>
  );
}