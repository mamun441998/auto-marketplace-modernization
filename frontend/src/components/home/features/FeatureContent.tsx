"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FeatureItem } from "./featuresData";

interface Props {
  feature: FeatureItem;
  allFeatures: readonly FeatureItem[];
  activeIndex: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hide: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
};

const child = {
  hide: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function FeatureContent({ allFeatures, activeIndex }: Props) {
  return (
    <div className="flex flex-col items-start text-left w-full">
      {/* Grid-stack: height stays constant (tallest item), no layout shift */}
      <div className="grid w-full grid-cols-1 grid-rows-1">
        {allFeatures.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.div
              key={item.id}
              variants={container}
              initial="hide"
              animate={isActive ? "show" : "hide"}
              className={`col-start-1 row-start-1 flex flex-col justify-start ${
                isActive ? "pointer-events-auto z-10" : "pointer-events-none z-0 select-none"
              }`}
              aria-hidden={!isActive}
            >
              {/* Badge */}
              <motion.div
                variants={child}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#FC5E01]" />
                {item.badge}
              </motion.div>

              {/* Title */}
              <motion.h2
                variants={child}
                className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
              >
                {item.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={child}
                className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed max-w-xl"
              >
                {item.description}
              </motion.p>

              {/* Action Link */}
              <motion.div variants={child} className="mt-6">
                <Link
                  href={item.linkHref || "#"}
                  tabIndex={isActive ? 0 : -1}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#FC5E01]"
                >
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}