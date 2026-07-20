"use client";

import React from 'react';
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const SectionHeader: React.FC = () => {
  return (
    <motion.header
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.5,
      }}
      className="relative z-20 mx-auto w-full max-w-[1700px] px-6 pt-10 pb-16 sm:px-8 lg:px-12 xl:px-16 text-center"
    >
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-[#FC5E01]/10 blur-[150px]"
      />

      <div className="mx-auto max-w-[1600px] text-center">
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 backdrop-blur-xl shadow-sm"
        >
          <span className="h-2 w-2 rounded-full bg-[#FC5E01] animate-pulse" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
            Why MotoHave
          </span>
        </motion.div>

        {/* Heading with your exact requested class */}
        <motion.h2
          variants={itemVariants}
          className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight whitespace-normal lg:whitespace-nowrap"
        >
          One Platform.{" "}
          <span className="bg-gradient-to-r from-[#FC5E01] via-[#FF8A3D] to-[#FC5E01] bg-clip-text text-transparent">
            Every Dealership Need.
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-[1250px] text-[17px] leading-relaxed text-white/65 lg:text-[19px]"
        >
          Stop juggling disconnected tools, spreadsheets, and legacy software. MotoHave combines your entire dealership workflow into a single, high-performance ecosystem.
        </motion.p>
      </div>
    </motion.header>
  );
};