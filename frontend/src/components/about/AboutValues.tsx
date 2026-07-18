// src/components/about/AboutValues.tsx
"use client";

import { motion } from "framer-motion";
import { values } from "./aboutData";

export default function AboutValues() {
  return (
    <div>
      {/* Section Heading */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FC5E01]">
          What We Stand For
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white leading-tight">
          Our Core <span className="text-[#FC5E01]">Values</span>
        </h2>
        <p className="mt-4 text-[#94A3B8]">
          The principles that guide every decision we make, from product
          design to customer support.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {values.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-2xl border border-[#262626] bg-[#171717] p-7 transition-all duration-300 hover:border-[#FC5E01]/40 hover:shadow-xl hover:shadow-[#FC5E01]/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FC5E01]/10 text-[#FC5E01] transition-all duration-300 group-hover:bg-[#FC5E01] group-hover:text-white group-hover:scale-110">
                <Icon size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}