"use client";

import { motion } from "framer-motion";

const pipeline = [
  {
    stage: "New Lead",
    color: "bg-blue-500",
    count: 24,
    width: "85%",
  },
  {
    stage: "Contacted",
    color: "bg-cyan-500",
    count: 18,
    width: "65%",
  },
  {
    stage: "Negotiation",
    color: "bg-yellow-500",
    count: 9,
    width: "35%",
  },
  {
    stage: "Closed",
    color: "bg-emerald-500",
    count: 5,
    width: "20%",
  },
];

export default function CRMAnimation() {
  return (
    <div className="relative h-[320px] w-[320px] flex items-center justify-center">
      {/* Glow */}
      <motion.div
        animate={{
          opacity: [0.15, 0.32, 0.15],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full bg-emerald-500/20 blur-[60px]"
      />

      {/* CRM Card (Compact & Perfectly Fitted) */}
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
              CRM Pipeline
            </p>
            <h3 className="text-base font-black text-white">
              56 Active Leads
            </h3>
          </div>

          <div className="rounded-lg bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400">
            Live
          </div>
        </div>

        {/* Pipeline (Optimized Spacing) */}
        <div className="space-y-2 my-1">
          {pipeline.map((item, index) => (
            <motion.div
              key={item.stage}
              initial={{
                opacity: 0,
                x: -15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium text-white/90">
                  {item.stage}
                </span>
                <span className="font-bold text-slate-400">
                  {item.count}
                </span>
              </div>

              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{
                    width: [ "0%", item.width, item.width ],
                  }}
                  transition={{
                    duration: 1,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className={`h-full rounded-full ${item.color}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Badge */}
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
            border-emerald-500/30
            bg-emerald-500/10
            py-2
            px-3
            text-center
            text-xs
            font-bold
            text-emerald-300
          "
        >
          AI Following Up Automatically
        </motion.div>
      </div>
    </div>
  );
}