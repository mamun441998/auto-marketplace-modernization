"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Logo from "@/assets/Footer-logo/Moto-center.png";

export default function FeatureCenter() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        z-30
        will-change-transform
      "
    >
      {/* Deep Rich Orange Ambient Glow Aura */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[240px]
          w-[240px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-gradient-to-tr
          from-[#E54800]/40
          via-[#FF5500]/25
          to-transparent
          blur-[70px]
          pointer-events-none
          will-change-transform
        "
      />

      {/* Outer Rotating Deep Orange Border */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[196px]
          w-[196px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-dashed
          border-[#E54800]/60
          shadow-[0_0_20px_rgba(229,72,0,0.3)]
          will-change-transform
        "
      />

      {/* Main Glassmorphism Circle */}
      <div
        className="
          relative
          flex
          items-center
          justify-center
          h-[150px]
          w-[150px]
          sm:h-[170px]
          sm:w-[170px]
          rounded-full
          border
          border-white/15
          bg-gradient-to-b
          from-[#1c1d22]/95
          to-[#111216]/95
          backdrop-blur-2xl
          shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)]
        "
      >
        {/* Inner Glowing Deep Orange Accent Ring */}
        <motion.div
          animate={{
            opacity: [0.4, 0.85, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            inset-4
            rounded-full
            border
            border-[#E54800]/50
            shadow-[inset_0_0_20px_rgba(229,72,0,0.25)]
          "
        />

        {/* Logo with Smooth Floating */}
        <motion.div
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-20 will-change-transform"
        >
          <Image
            src={Logo}
            alt="MotoHave"
            width={95}
            height={95}
            priority
            draggable={false}
            className="
              h-[76px]
              sm:h-[110px]
              w-auto
              object-contain
              select-none
              drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]
            "
          />
        </motion.div>
      </div>
    </motion.div>
  );
}