// features/FeatureCard.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { FeatureItem } from "./featuresData";

interface FeatureCardProps {
  feature: FeatureItem;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className="w-full flex flex-col justify-center select-none will-change-transform"
    >
      {/* Badge */}
      <div className="mb-4">
        <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase text-white bg-gradient-to-r ${feature.colorTheme} shadow-sm`}>
          {feature.badge}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight mb-4 leading-tight">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-[#94A3B8] text-sm md:text-base font-normal leading-relaxed max-w-xl mb-5">
        {feature.description}
      </p>

      {/* Highlight Tag */}
      <div className="inline-flex items-center gap-2.5 py-1.5 px-3 rounded-xl bg-[#171717] border border-[#262626] w-fit">
        <div className={`p-1 rounded-lg bg-gradient-to-r ${feature.colorTheme}`}>
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-xs font-bold text-white pr-1">
          {feature.highlightText}
        </span>
      </div>
    </motion.div>
  );
};