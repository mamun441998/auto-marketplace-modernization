"use client";

import { motion } from "framer-motion";

export default function ProductHeader() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <span
          className="
            inline-flex
            items-center
            gap-2

            rounded-full

            border
            border-[#FC5E01]/20

            bg-[#FC5E01]/10

            px-5
            py-2

            text-[11px]
            font-semibold
            uppercase
            tracking-[0.22em]

            text-[#FC5E01]
          "
        >
          <span className="h-2 w-2 rounded-full bg-[#FC5E01]" />

          Platform Modules
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.1,
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight"
      >
        See your entire
        <br className="sm:hidden" />{" "}
        <span>Dealership in one dashboard</span>
      </motion.h2>
    </div>
  );
}