"use client";

import { motion } from "framer-motion";

type Props = {
  angle: number;
  length: number;
  active?: boolean;
};

export default function OrbitLine({
  angle,
  length,
  active = false,
}: Props) {
  return (
    <div
      className="absolute left-1/2 top-1/2 origin-left pointer-events-none z-10"
      style={{
        width: `${length}px`,
        transform: `rotate(${angle}deg)`,
      }}
    >
      {/* Base Line */}
      <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-white/10" />

      {/* Active Glowing Line */}
      <motion.div
        initial={false}
        animate={{
          opacity: active ? 1 : 0.15,
          scaleX: active ? 1 : 0.3,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className="
          absolute
          left-0
          top-1/2
          h-[2.5px]
          origin-left
          -translate-y-1/2
          will-change-transform
        "
        style={{
          width: "100%",
          background:
            "linear-gradient(90deg, #FF5500 0%, rgba(255,85,0,0.3) 100%)",
          boxShadow: "0 0 12px rgba(255,85,0,0.8)",
        }}
      />

      {/* Moving Light Beam */}
      {active && (
        <motion.div
          animate={{
            x: ["0%", "100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            top-1/2
            h-[4px]
            w-[40px]
            -translate-y-1/2
            rounded-full
            bg-white
            shadow-[0_0_10px_#FF5500]
            pointer-events-none
          "
        />
      )}

      {/* End Dot */}
      <motion.div
        animate={{
          scale: active ? [1, 1.4, 1] : 1,
          opacity: active ? 1 : 0.5,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-0
          top-1/2
          h-3
          w-3
          -translate-y-1/2
          rounded-full
          bg-[#FF5500]
        "
        style={{
          boxShadow: "0 0 15px #FF5500",
        }}
      />
    </div>
  );
}