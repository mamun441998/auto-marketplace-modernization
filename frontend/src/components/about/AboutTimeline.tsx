// src/components/about/AboutTimeline.tsx
"use client";

import { motion } from "framer-motion";
import { timeline } from "./aboutData";

export default function AboutTimeline() {
  return (
    <div>
      {/* Section Heading */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FC5E01]">
          Our Journey
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white leading-tight">
          Milestones Along <span className="text-[#FC5E01]">The Way</span>
        </h2>
        <p className="mt-4 text-[#94A3B8]">
          From an idea sparked by dealership frustration to a platform
          trusted by hundreds of businesses.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative mx-auto max-w-2xl">
        {/* Vertical Line */}
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[#262626]" />

        <div className="flex flex-col gap-10">
          {timeline.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex gap-6 pl-0"
            >
              {/* Dot */}
              <div className="relative z-10 flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#FC5E01] bg-[#0A0A0A]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FC5E01]" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 rounded-2xl border border-[#262626] bg-[#171717] p-5 -mt-1">
                <span className="inline-block rounded-full bg-[#FC5E01]/10 px-2.5 py-1 text-xs font-bold text-[#FC5E01] border border-[#FC5E01]/20">
                  {item.year}
                </span>
                <h3 className="mt-3 text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#94A3B8]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}