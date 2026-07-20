"use client";

import { motion } from "framer-motion";
import { FeatureItem } from "./featuresData";

interface Props {
  features: readonly FeatureItem[];
  activeIndex: number;
  onSelect?: (index: number) => void;
}

export default function FeatureProgress({
  features,
  activeIndex,
  onSelect,
}: Props) {
  return (
    <div className="hidden xl:flex flex-col justify-center gap-5">
      {features.map((feature, index) => {
        const active = index === activeIndex;

        return (
          <motion.div
            key={feature.id}
            onClick={() => onSelect?.(index)}
            layout
            transition={{
              duration: 0.35,
            }}
            className="group flex items-center gap-4 cursor-pointer select-none py-1"
          >
            {/* Line / Indicator */}
            <div className="relative flex flex-col items-center">
              <motion.div
                animate={{
                  height: active ? 44 : 22,
                  width: active ? 4 : 2,
                  backgroundColor: active
                    ? feature.accent || "#FC5E01"
                    : "rgba(255, 255, 255, 0.15)",
                }}
                whileHover={{
                  backgroundColor: active
                    ? feature.accent || "#FC5E01"
                    : "rgba(255, 255, 255, 0.4)",
                }}
                transition={{
                  duration: 0.3,
                }}
                className="rounded-full shadow-sm"
              />
            </div>

            {/* Text */}
            <div>
              <motion.p
                animate={{
                  color: active ? "#ffffff" : "#64748B",
                }}
                whileHover={{
                  color: active ? "#ffffff" : "#cbd5e1",
                }}
                className="text-sm font-semibold tracking-wide transition-colors"
              >
                {feature.badge}
              </motion.p>

              <motion.p
                animate={{
                  opacity: active ? 1 : 0.35,
                }}
                className="mt-1 text-xs text-slate-500 font-mono"
              >
                {String(index + 1).padStart(2, "0")}
              </motion.p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}