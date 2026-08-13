"use client";

import { AnimatePresence, motion } from "framer-motion";

import AIMarketingAnimation from "./animations/AIMarketingAnimation";
import AnalyticsAnimation from "./animations/AnalyticsAnimation";
import ListingAnimation from "./animations/ListingAnimation";
import WebsiteAnimation from "./animations/WebsiteAnimation";
import CRMAnimation from "./animations/CRMAnimation";

interface Props {
  id: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function FeatureAnimation({ id }: Props) {
  const renderAnimation = () => {
    switch (id) {
      case 1: return <AIMarketingAnimation />;
      case 2: return <AnalyticsAnimation />;
      case 3: return <ListingAnimation />;
      case 4: return <WebsiteAnimation />;
      case 5: return <CRMAnimation />;
      default: return <AIMarketingAnimation />;
    }
  };

  return (
    <div className="relative flex w-full h-full items-center justify-center overflow-visible bg-transparent">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.45, ease: EASE }}
          style={{ willChange: "transform, opacity" }}
          className="relative flex items-center justify-center w-full bg-transparent border-none shadow-none outline-none"
        >
          {renderAnimation()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}