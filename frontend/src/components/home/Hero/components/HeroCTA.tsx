"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mt-4 flex flex-wrap items-center justify-center gap-4"
    >
      {/* Primary CTA */}
      <motion.div
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          href="/register"
          className="
            group
            relative
            inline-flex
            items-center
            gap-2
            overflow-hidden
            rounded-xl
            bg-[#FC5E01]
            px-8
            py-3
            text-sm
            font-bold
            text-white
            shadow-[0_0_35px_rgba(252,94,1,.30)]
            transition-all
            duration-300
            hover:shadow-[0_0_55px_rgba(252,94,1,.55)]
          "
        >
          {/* Shine */}
          <span
            className="
              absolute
              left-[-120%]
              top-0
              h-full
              w-16
              rotate-12
              bg-white/20
              blur-md
              transition-all
              duration-700
              group-hover:left-[120%]
            "
          />

          <span className="relative z-10">
            Start Free Trial
          </span>

          <motion.div
            className="relative z-10"
            animate={{ x: [0, 4, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
            }}
          >
            <ArrowRight size={18} />
          </motion.div>
        </Link>
      </motion.div>

      {/* Secondary CTA */}
      <motion.div
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          href="/pricing"
          className="
            inline-flex
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            px-8
            py-3
            text-sm
            font-semibold
            text-white
            transition-all
            duration-300
            hover:border-[#FC5E01]
            hover:bg-[#FC5E01]/10
            hover:text-[#FC5E01]
          "
        >
          View Pricing
        </Link>
      </motion.div>
    </motion.div>
  );
}