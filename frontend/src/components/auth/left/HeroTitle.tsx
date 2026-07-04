"use client";
import { motion } from "framer-motion";
export default function HeroTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="
        ml-6
        sm:ml-10
        lg:ml-16
      "
    >
      {/* Badge */}
      <div
        className="
          inline-flex
          rounded-full
          border
          border-blue-200
          bg-white/90
          px-5
          py-2
          shadow-sm
        "
      >
        <span
          className="
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-blue-700
          "
        >
          MODERN DEALERSHIP PLATFORM
        </span>
      </div>
      {/* Heading */}
      <h1
        className="
          mt-7
          whitespace-nowrap
          text-[16px]
          sm:text-[20px]
          lg:text-[24px]
          xl:text-[28px]
          font-extrabold
          leading-[1.1]
          tracking-[-0.02em]
          text-slate-900
        "
      >
        Drive Your Dealership{" "}
        <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
          To The Next Level
        </span>
      </h1>
      {/* Description */}
      <p
        className="
          mt-3
          max-w-[500px]
          text-[18px]
          leading-6
          text-slate-800
        "
      >
       <strong>One Platfrom to Manage Your Dealership All  Operations.</strong> 
      </p>
    </motion.div>
  );
}