"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center justify-center w-full"
    >
      {/* Orange Glow (Brand Color) */}
      <div className="absolute h-[480px] w-[480px] rounded-full bg-[#FC5E01]/20 blur-[130px]" />

      {/* Dashboard Image with Fade Effect */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full max-w-[780px]"
      >
        <div className="relative">
          <Image
            src="/hero-image.png"
            alt="MotoHave Dashboard"
            width={980}
            height={610}
            priority
            className="w-full h-auto rounded-3xl border border-[#1e2a4a] shadow-2xl select-none pointer-events-none"
          />

          {/* Right Side Fade Overlay (Dark Theme) */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-[#0C1A32]/10 to-[#0C1A32]/60" />
        </div>
      </motion.div>
    </motion.div>
  );
}