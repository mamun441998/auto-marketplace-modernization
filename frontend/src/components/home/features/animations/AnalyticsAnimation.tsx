"use client";

import { motion } from "framer-motion";

const bars = [45, 78, 62, 92, 70, 100, 82];

export default function AnalyticsAnimation() {
  return (
    <div className="relative h-[320px] w-[320px] flex items-center justify-center">
      {/* Glow */}
      <motion.div
        animate={{
          opacity: [0.15, 0.35, 0.15],
          scale: [1, 1.06, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full bg-blue-500/20 blur-[60px]"
      />

      {/* Dashboard Card (Compact & Perfectly Fitted) */}
      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          relative
          h-full
          w-full
          max-w-[280px]
          rounded-2xl
          border
          border-white/10
          bg-[#121317]
          p-3.5
          flex
          flex-col
          justify-between
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Analytics
            </p>
            <h3 className="text-base font-black text-white">
              $248.2K
            </h3>
          </div>

          <div className="rounded-lg bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-bold text-blue-400">
            +18%
          </div>
        </div>

        {/* Chart (Compact height) */}
        <div className="flex h-[95px] items-end gap-1.5 my-2">
          {bars.map((bar, index) => (
            <motion.div
              key={index}
              initial={{
                height: 10,
              }}
              animate={{
                height: `${bar}%`,
              }}
              transition={{
                delay: index * 0.08,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="
                flex-1
                rounded-t-md
                bg-gradient-to-t
                from-blue-600
                to-cyan-400
              "
            />
          ))}
        </div>

        {/* Bottom KPIs */}
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              title: "Leads",
              value: "124",
            },
            {
              title: "Cars",
              value: "92",
            },
            {
              title: "Sales",
              value: "38",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{
                scale: 1.03,
              }}
              className="
                rounded-xl
                border
                border-white/5
                bg-white/[0.03]
                p-2
                text-center
              "
            >
              <p className="text-[9px] uppercase tracking-widest text-slate-500">
                {item.title}
              </p>
              <p className="text-sm font-black text-white">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}