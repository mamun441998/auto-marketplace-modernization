// src/components/about/AboutStory.tsx
"use client";

import { motion } from "framer-motion";
import { Layers3 } from "lucide-react";

export default function AboutStory() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* LEFT - Story Text */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-xs font-bold uppercase tracking-wider text-[#FC5E01]">
          Our Story
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white leading-tight">
          From Dealership Frustration To
          <span className="text-[#FC5E01]"> One Unified Platform</span>
        </h2>

        <div className="mt-6 space-y-4 text-[#94A3B8] leading-relaxed">
          <p>
            Before MotoHave, running a dealership meant juggling separate
            software for inventory, a different CRM for leads, a third-party
            website builder, and yet another tool for marketing campaigns.
            None of them talked to each other.
          </p>
          <p>
            We spent months talking to dealership owners and sales teams to
            understand exactly where their time was being wasted — duplicate
            data entry, missed follow-ups, and websites that never matched
            what was actually in stock.
          </p>
          <p>
            MotoHave was built to fix that. Inventory, CRM, your dealership
            website, marketing, AI tools and payments — all in one dashboard,
            all connected in real time.
          </p>
        </div>
      </motion.div>

      {/* RIGHT - Visual Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-full bg-[#FC5E01]/10 blur-[100px]" />

        <div className="relative rounded-[28px] border border-[#262626] bg-[#171717] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FC5E01] text-white">
              <Layers3 size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Before MotoHave</h3>
              <p className="text-sm text-[#94A3B8]">4-5 disconnected tools</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {["Inventory Spreadsheet", "Separate CRM Tool", "Third-party Website", "Manual Marketing"].map((tool) => (
              <div key={tool} className="flex items-center justify-between rounded-xl border border-[#262626] bg-[#0A0A0A]/50 px-4 py-3">
                <span className="text-sm font-medium text-[#94A3B8]">{tool}</span>
                <span className="rounded-full bg-rose-500/10 px-2.5 py-1 text-[10px] font-semibold text-rose-400 border border-rose-500/20">
                  Disconnected
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#FC5E01] to-[#E5540A] py-4 text-center text-white">
            <h4 className="text-base font-bold">Now: One Platform</h4>
            <p className="mt-1 text-sm text-white/90">Everything Connected & Synced</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}