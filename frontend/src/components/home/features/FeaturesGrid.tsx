// features/FeaturesGrid.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FeatureItem } from "./featuresData";
import AIMarketingMockup from "./mockups/AIMarketingMockup";
import AnalyticsMockup from "./mockups/AnalyticsMockup";
import ListingEngineMockup from "./mockups/ListingEngineMockup";
import SecureCheckoutMockup from "./mockups/SecureCheckoutMockup";

interface FeaturesGridProps {
  features: FeatureItem[];
  activeIndex: number;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ features, activeIndex }) => {
  const activeFeature = features[activeIndex];

  const renderMockup = () => {
    switch (activeFeature.id) {
      case 1:
        return <AIMarketingMockup />;
      case 2:
        return <AnalyticsMockup />;
      case 3:
        return <ListingEngineMockup />;
      case 4:
        return <SecureCheckoutMockup />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto h-[340px] md:h-[380px] lg:h-[400px] rounded-2xl bg-[#141414] border border-[#262626] relative overflow-hidden flex flex-col p-4 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={`glow-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-tr ${activeFeature.colorTheme} blur-[60px] rounded-2xl pointer-events-none`}
        />
      </AnimatePresence>

      <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#171717] border border-[#262626] shadow-sm flex flex-col p-4">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between w-full border-b border-[#262626] pb-3 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#262626]" />
            <span className="w-2 h-2 rounded-full bg-[#262626]" />
            <span className="text-[10px] font-mono text-[#64748B] ml-1 uppercase tracking-wider">
              MotoHave Engine
            </span>
          </div>
          <span className="px-2 py-0.5 text-[9px] font-bold text-[#FC5E01] bg-[#FC5E01]/10 rounded-full border border-[#FC5E01]/20">
            Live
          </span>
        </div>

        {/* Feature-specific Mockup */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex-1 min-h-0"
          >
            {renderMockup()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};