"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { featuresData } from "./featuresData";
import { FeaturesHeader } from "./FeaturesHeader";
import FeatureContent from "./FeatureContent";
import FeatureAnimation from "./FeatureAnimation";
import FeatureImage from "./FeatureImage";
import FeatureProgress from "./FeatureProgress";

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const feature = featuresData[activeIndex] || featuresData[0];
  const totalFeatures = featuresData.length;

  // পুরো কন্টেইনারের স্ক্রল প্রোগ্রেস ট্র্যাক করা
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // স্ক্রল প্রোগ্রেস অনুযায়ী activeIndex পরিবর্তন করা
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const computedIndex = Math.min(
      Math.floor(latest * totalFeatures),
      totalFeatures - 1
    );
    setActiveIndex(computedIndex);
  });

  const scale = useTransform(scrollYProgress, [0.8, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0.85, 1], [1, 0.8]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalFeatures);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalFeatures) % totalFeatures);
  };

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#0D0D10]">
      {/* স্টিকি সেকশন: ব্যাকগ্রাউন্ড কালার #171617 এবং নিচে rounded দেওয়া হলো */}
      <motion.section 
        style={{ scale, opacity }}
        className="sticky top-0 h-screen overflow-hidden border-t border-white/10 flex flex-col justify-center py-4 xl:py-6 z-10 origin-top bg-[#171617] rounded-b-[32px] shadow-2xl"
      >
        
        {/* Background Layer */}
        <div className="absolute inset-0 pointer-events-none z-0 rounded-b-[32px] overflow-hidden">
          <motion.div
            key={feature.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
            }}
            className={`absolute inset-0 ${feature.background}`}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:36px_36px] opacity-30" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Main Content Wrapper */}
        <div className="relative z-20 flex w-full flex-col">
          <FeaturesHeader />

          <div
            className="
              w-full
              max-w-[1700px]
              mx-auto
              px-6
              md:px-10
              xl:px-16
              mt-2
            "
          >
            {/* Grid Container */}
            <div
              className="
                flex
                flex-col
                xl:grid
                w-full
                items-center
                gap-4
                xl:grid-cols-[380px_280px_minmax(0,1fr)_160px]
                2xl:grid-cols-[420px_320px_minmax(0,1fr)_180px]
              "
            >
              {/* Left Content */}
              <div className="w-full">
                <FeatureContent
                  feature={feature}
                  allFeatures={featuresData}
                  activeIndex={activeIndex}
                />
              </div>

              {/* Animation Centerpiece */}
              <div className="w-full flex justify-center my-1 xl:my-0">
                <FeatureAnimation id={feature.id} />
              </div>

              {/* Interactive Mockup/Image */}
              <div className="w-full">
                <FeatureImage feature={feature} />
              </div>

              {/* Vertical Progress Tracker */}
              <FeatureProgress
                features={featuresData}
                activeIndex={activeIndex}
                onSelect={(index) => setActiveIndex(index)}
              />
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
              {/* Counter Text */}
              <div className="text-xs font-mono text-white/50">
                <span className="text-white font-bold">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>{" "}
                / {String(totalFeatures).padStart(2, "0")}
              </div>

              {/* Pill-shaped Unified Arrow Buttons */}
              <div className="flex items-center rounded-full bg-[#16171B] border border-white/10 p-1 shadow-lg">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Feature"
                  className="flex h-9 w-11 items-center justify-center rounded-full text-white/85 transition-all hover:bg-orange-500/10 hover:text-orange-500 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="h-4 w-[1px] bg-white/10" />

                <button
                  onClick={handleNext}
                  aria-label="Next Feature"
                  className="flex h-9 w-11 items-center justify-center rounded-full text-white/85 transition-all hover:bg-orange-500/10 hover:text-orange-500 active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}