"use client";

import { motion } from "framer-motion";

export default function OrbitBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Outer Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[620px]
          w-[620px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-white/[0.04]
        "
      />

      {/* Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-white/[0.05]
        "
      />

      {/* Ring (Orange Accent) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[390px]
          w-[390px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-[#FC5E01]/12
        "
      />

      {/* Small Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[290px]
          w-[290px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-white/[0.05]
        "
      />

      {/* Grid */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(#ffffff08_1px,transparent_1px)]
          [background-size:34px_34px]
          opacity-25
        "
      />
    </div>
  );
}