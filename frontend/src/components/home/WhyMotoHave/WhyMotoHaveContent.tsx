"use client";

import { motion } from "framer-motion";
import { benefits } from "./whyMotoHaveData";
import WhyMotoHaveIllustration from "./WhyMotoHaveIllustration";

export default function WhyMotoHaveContent() {
  return (
    <div className="mt-14 grid items-center gap-10 lg:grid-cols-[52%_48%] xl:gap-14">
      {/* LEFT */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {benefits.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.55 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-[#262626] bg-[#171717] p-5 shadow-sm transition-all duration-300 hover:border-[#FC5E01]/40 hover:shadow-xl hover:shadow-[#FC5E01]/5"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FC5E01]/0 via-[#FC5E01]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                {/* Icon */}
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#FC5E01]/10 text-[#FC5E01] transition-all duration-300 group-hover:bg-[#FC5E01] group-hover:text-white group-hover:scale-110">
                  <Icon size={20} />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold leading-6 text-white">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-6 text-[#94A3B8]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* RIGHT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex justify-center lg:justify-end"
      >
        <WhyMotoHaveIllustration />
      </motion.div>
    </div>
  );
}