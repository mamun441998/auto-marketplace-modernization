"use client";

import { motion } from "framer-motion";
import { Sparkles, Check, Star } from "lucide-react";

import HeroButtons from "./HeroButtons";

const TRUST = ["No setup fee", "Free migration", "24/7 Support"];

export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      className="flex w-full flex-col items-center justify-center mx-auto max-w-[560px] py-2 text-center lg:mx-0 lg:items-start lg:py-0 lg:text-left"
    >
      {/* Badge */}
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1e2a4a] bg-[#111B33] px-4 py-2 text-xs font-semibold text-[#94a3b8]">
        <span className="relative flex h-2 w-2">
          <span className="hero-pulse absolute inline-flex h-full w-full rounded-full bg-[#FC5E01]" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FC5E01]" />
        </span>
        <Sparkles size={14} className="text-[#FC5E01]" />
        Built for Modern Auto Dealerships
      </div>

      {/* Heading */}
      <h1 className="mt-6 font-bold tracking-tight text-white text-4xl leading-[1.1] sm:text-5xl xl:text-6xl">
        The Complete
        <span className="block bg-gradient-to-r from-[#FC5E01] to-[#FF8533] bg-clip-text text-transparent">
          Dealership Management
        </span>
        Platform
      </h1>

      {/* Description */}
      <p className="mt-6 max-w-[520px] text-lg leading-8 text-[#94a3b8]">
        Manage inventory, CRM, website, marketing, sales and analytics from one powerful platform built for modern automotive businesses.
      </p>

      {/* Buttons */}
      <div className="mt-8">
        <HeroButtons />
      </div>

      {/* Trust Signals */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 lg:justify-start">
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="h-8 w-8 rounded-full border-2 border-[#0C1A32] bg-[#FC5E01]" />
          ))}
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="text-sm font-medium text-[#94a3b8]">
          Trusted by <span className="font-semibold text-white">500+</span> dealerships
        </span>
      </div>

      {/* Trust Badges */}
      <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#94a3b8] lg:justify-start">
        {TRUST.map((item) => (
          <span key={item} className="inline-flex items-center gap-1.5">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#FC5E01]/10">
              <Check size={11} className="text-[#FC5E01]" strokeWidth={3} />
            </span>
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}