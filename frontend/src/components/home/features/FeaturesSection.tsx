"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";

import { featuresData } from "./featuresData";
import { FeaturesHeader } from "./FeaturesHeader";
import { FeatureCard } from "./FeatureCard";
import { FeaturesGrid } from "./FeaturesGrid";

const AUTO_PLAY_INTERVAL = 10000; // 10 sec

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = featuresData.length;

  const goToIndex = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex > total - 1) return;
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [total]);

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-24">
      <div className="flex flex-col gap-12">
        <FeaturesHeader />

        <div
          className="
            mx-auto
            grid
            w-full
            max-w-7xl
            grid-cols-1
            items-center
            gap-14
            px-6
            lg:grid-cols-12
            lg:px-8
          "
        >
          {/* LEFT */}
          <div className="relative flex h-[320px] items-center lg:col-span-5">
            <AnimatePresence mode="wait">
              <FeatureCard
                key={activeIndex}
                feature={featuresData[activeIndex]}
              />
            </AnimatePresence>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-center lg:col-span-7">
            <FeaturesGrid
              features={featuresData}
              activeIndex={activeIndex}
            />
          </div>
        </div>

        {/* Indicator */}
        <div className="translate-y-2 pb-0 flex justify-center gap-2">
          {featuresData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              aria-label={`Go to feature ${index + 1}`}
              className={`rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "h-2 w-8 bg-blue-600"
                  : "h-2 w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}