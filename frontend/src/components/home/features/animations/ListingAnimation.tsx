"use client";

import { motion } from "framer-motion";
import { Car } from "lucide-react";

export default function ListingAnimation() {
  return (
    <div className="relative h-[320px] w-[320px] flex items-center justify-center">
      {/* Purple Glow */}
      <motion.div
        animate={{
          opacity: [0.15, 0.3, 0.15],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full bg-violet-500/20 blur-[60px]"
      />

      {/* Main Container Card */}
      <div
        className="
          relative
          h-full
          w-full
          max-w-[280px]
          rounded-2xl
          border
          border-white/10
          bg-[#111216]
          p-3
          flex
          flex-col
          justify-between
          shadow-2xl
        "
      >
        {/* Top Vehicle Preview Box */}
        <div className="relative overflow-hidden rounded-xl border border-white/10 h-[95px] w-full bg-black/40 flex items-center justify-center">
          <div className="flex flex-col items-center gap-1 text-violet-400">
            <Car className="w-8 h-8 opacity-80" />
            <span className="text-[10px] tracking-wider uppercase font-semibold text-white/60">Vehicle Scanner</span>
          </div>

          {/* Scan Line */}
          <motion.div
            animate={{
              top: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              left-0
              right-0
              h-[2px]
              bg-violet-400
              shadow-[0_0_12px_#8B5CF6]
            "
          />
        </div>

        {/* Detection Items */}
        <div className="space-y-1.5 my-1">
          {[
            "BMW X5 2023",
            "Mileage: 18,400 km",
            "Automatic • Petrol",
          ].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="flex items-center gap-2"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-violet-400 flex-shrink-0" />
              <span className="text-xs text-white/90 font-medium">
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Ready Badge */}
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            rounded-xl
            border
            border-violet-500/30
            bg-violet-500/10
            py-2
            px-3
            text-center
            text-xs
            font-bold
            text-violet-300
          "
        >
          Listing Ready To Publish
        </motion.div>
      </div>
    </div>
  );
}