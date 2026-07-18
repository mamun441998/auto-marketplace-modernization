"use client";

import { motion } from "framer-motion";
import LogoCard from "./LogoCard";
import { brands } from "./brands";

// মেমোরি অপ্টিমাইজেশনের জন্য marqueeItems কে কম্পোনেন্টের বাইরে রাখা ভালো
const marqueeItems = [...brands, ...brands, ...brands];

export default function Marquee() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Left Fade: সেকশনের মেইন ব্যাকগ্রাউন্ড কালার (#0D111C) এর সাথে ম্যাচ করা হয়েছে */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-32 bg-gradient-to-r from-[#0D111C] via-[#0D111C]/80 to-transparent" />

      {/* Right Fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-32 bg-gradient-to-l from-[#0D111C] via-[#0D111C]/80 to-transparent" />

      <motion.div
        className="flex w-max items-center gap-14"
        animate={{
          x: ["0%", "-33.333%"],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {marqueeItems.map((brand, index) => (
          <LogoCard
            key={`${brand.id}-${index}`}
            brand={brand}
          />
        ))}
      </motion.div>
    </div>
  );
}