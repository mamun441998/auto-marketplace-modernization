"use client";

import { motion } from "framer-motion";
import { LayoutTemplate } from "lucide-react";

export default function WebsiteAnimation() {
  return (
    <div className="relative h-[320px] w-[320px] flex items-center justify-center">
      {/* Cyan Glow */}
      <motion.div
        animate={{
          opacity: [0.18, 0.35, 0.18],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full bg-cyan-500/20 blur-[60px]"
      />

      {/* Browser Card (Compact & Fitted) */}
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
          overflow-hidden
          flex
          flex-col
          justify-between
          shadow-2xl
        "
      >
        {/* Browser Header */}
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5 flex-shrink-0">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <div className="h-2 w-2 rounded-full bg-yellow-500" />
          <div className="h-2 w-2 rounded-full bg-green-500" />

          <div className="ml-2 rounded-md bg-[#1A1C22] px-2.5 py-0.5 text-[9px] text-slate-400 font-mono">
            dealer.motohave.com
          </div>
        </div>

        {/* Website Preview Content Area */}
        <div className="relative p-3 flex-1 flex flex-col justify-between">
          <div className="relative overflow-hidden rounded-xl border border-white/10 h-[100px] w-full bg-black/40 flex items-center justify-center">
            <div className="flex flex-col items-center gap-1 text-cyan-400">
              <LayoutTemplate className="w-7 h-7 opacity-80" />
              <span className="text-[10px] tracking-wider uppercase font-semibold text-white/60">Website Builder</span>
            </div>
          </div>

          {/* Publish Button */}
          <div className="mt-2">
            <motion.button
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                w-full
                rounded-xl
                bg-cyan-500
                py-2.5
                text-xs
                font-bold
                text-white
                shadow-[0_0_20px_rgba(6,182,212,0.4)]
              "
            >
              Publish Website
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}