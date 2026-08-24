"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

import { featuresData } from "./featuresData";
import { FeaturesHeader } from "./FeaturesHeader";
import FeatureContent from "./FeatureContent";
import FeatureAnimation from "./FeatureAnimation";
import FeatureImage from "./FeatureImage";

// ১০ সেকেন্ড পর পর অটো স্লাইড হবে
const AUTO_PLAY_INTERVAL = 10000;

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1); // স্লাইড অ্যানিমেশনের ডিরেকশন ট্র্যাক করার জন্য
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const totalFeatures = featuresData.length;
  const currentFeature = featuresData[activeIndex] || featuresData[0];

  // অটো-প্লে স্লাইডার লজিক (১০ সেকেন্ড)
  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayTimerRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % totalFeatures);
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying, totalFeatures]);

  // ম্যানুয়াল ট্যাব ক্লিক হ্যান্ডলার
  const handleSelectTab = (index: number) => {
    setIsAutoPlaying(false);
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // অ্যারো বাটন নেভিগেশন (ডান/বাম)
  const handleNavigate = (dir: number) => {
    setIsAutoPlaying(false);
    setDirection(dir);
    setActiveIndex((prev) => (prev + dir + totalFeatures) % totalFeatures);
  };

  return (
    <section 
      className="relative w-full bg-[#0D0D10] text-white py-16 md:py-24 overflow-hidden border-t border-white/10"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* ব্যাকগ্রাউন্ড ডায়নামিক গ্লো ইফেক্ট */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFeature.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={`absolute inset-0 ${currentFeature.background || "bg-gradient-to-b from-orange-500/5 via-transparent to-transparent"}`}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.03)_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D10]/80 via-transparent to-[#0D0D10]" />
      </div>

      <div className="relative z-10 w-full max-w-[1700px] mx-auto px-4 sm:px-6 md:px-10 xl:px-16 flex flex-col gap-8 md:gap-12">
        {/* সেকশন হেডার */}
        <FeaturesHeader />

        {/* রেসপন্সিভ ট্যাব বার (মোবাইল ও ডেক্সটপ ফ্রেন্ডলি স্ক্রোলযোগ্য) */}
        <div className="w-full overflow-x-auto no-scrollbar py-2">
          <div className="flex items-center justify-start md:justify-center gap-2 sm:gap-3 min-w-max mx-auto px-2">
            {featuresData.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={item.id || index}
                  onClick={() => handleSelectTab(index)}
                  className={`relative flex items-center gap-2.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? "bg-[#1C1C22] text-white border-orange-500/50 shadow-lg shadow-orange-500/10"
                      : "bg-[#141419]/60 text-white/60 border-white/5 hover:bg-[#1C1C22]/60 hover:text-white/90"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center h-6 w-6 rounded-md text-xs font-mono font-bold transition-colors ${
                      isActive ? "bg-orange-500 text-white" : "bg-white/10 text-white/70"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item.title}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* মেইন স্লাইডার কন্টেন্ট কার্ড */}
        <div className="w-full bg-[#16161C] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentFeature.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* বাম পাশ: ফিচারের বিবরণ */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold tracking-wide uppercase w-fit">
                  <span>{currentFeature.badge}</span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                    {currentFeature.title}
                  </h3>
                  <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                    {currentFeature.description}
                  </p>
                </div>

                {currentFeature.highlightText && (
                  <div className="flex items-center gap-3 pt-2">
                    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white/90 text-sm sm:text-base font-medium">
                      <CheckCircle2 className="h-5 w-5 text-orange-500 shrink-0" />
                      <span>{currentFeature.highlightText}</span>
                    </div>
                  </div>
                )}

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <FeatureContent feature={currentFeature} allFeatures={featuresData} activeIndex={activeIndex} />
                </div>
              </div>

              {/* মাঝের অংশ: অ্যানিমেশন প্রিভিউ */}
              <div className="lg:col-span-3 flex items-center justify-center bg-[#0D0D10]/50 border border-white/5 rounded-2xl p-4 min-h-[260px]">
                <FeatureAnimation id={Number(currentFeature.id)} />
              </div>

              {/* ডান পাশ: হাই-রেজুলেশন স্ক্রিনশট বা মকআপ */}
              <div className="lg:col-span-4 flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D10]">
                <FeatureImage feature={currentFeature} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* স্লাইডারের ফুটার: কাউন্টার ও নেভিগেশন কন্ট্রোল অ্যারো */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            <div className="text-sm font-mono text-white/50 flex items-center gap-2">
              <span className="text-orange-500 font-bold text-base">{String(activeIndex + 1).padStart(2, "0")}</span>
              <span>/</span>
              <span>{String(totalFeatures).padStart(2, "0")}</span>
              <span className="hidden sm:inline-block ml-4 text-xs text-white/40">
                {isAutoPlaying ? "• Auto-sliding (10s)" : "• Paused"}
              </span>
            </div>

            {/* অ্যারো নেভিগেশন বাটন */}
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-full bg-[#0D0D10] border border-white/10 p-1">
                <button
                  onClick={() => handleNavigate(-1)}
                  aria-label="Previous Feature"
                  className="flex h-9 w-10 items-center justify-center rounded-full text-white/80 transition-all hover:bg-orange-500/20 hover:text-orange-400 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="h-4 w-[1px] bg-white/10" />
                <button
                  onClick={() => handleNavigate(1)}
                  aria-label="Next Feature"
                  className="flex h-9 w-10 items-center justify-center rounded-full text-white/80 transition-all hover:bg-orange-500/20 hover:text-orange-400 active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}