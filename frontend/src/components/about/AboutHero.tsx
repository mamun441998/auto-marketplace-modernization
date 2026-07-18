// src/components/about/AboutHero.tsx
"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center px-4 pt-28 pb-16 sm:pt-32 sm:pb-20">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#171717] px-4 py-2"
      >
        <span className="h-2 w-2 rounded-full bg-[#FC5E01] animate-pulse" />
        <span className="text-sm font-medium text-white/80">Our Mission</span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
      >
        Built To Help Dealerships
        <br />
        Sell <span className="text-[#FC5E01]">Smarter, Not Harder</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 max-w-2xl text-lg text-[#94A3B8]"
      >
        MotoHave started with a simple observation — dealerships were running
        their entire business across 4-5 disconnected tools. We built one
        platform to replace all of them.
      </motion.p>
    </div>
  );
}