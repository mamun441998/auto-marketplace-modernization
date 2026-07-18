"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { heroImages } from "../data/heroImages";

const AUTO_DELAY = 6000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [pause, setPause] = useState(false);

  const total = heroImages.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const previous = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (pause) return;
    const timer = setInterval(next, AUTO_DELAY);
    return () => clearInterval(timer);
  }, [pause, next]);

  return (
    <div
      className="relative mx-auto w-full max-w-[1320px]"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
    >
      {/* Frame - হাইট সামান্য কমানোর জন্য aspect-[16/8.5] */}
      <div className="relative overflow-hidden rounded-[30px] border border-white/5 bg-[#171A20] shadow-[0_40px_120px_rgba(0,0,0,.45)]">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={heroImages[current].id}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(e, info) => {
              if (info.offset.x < -90) next();
              if (info.offset.x > 90) previous();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
            className="relative aspect-[16/8.5] w-full p-3 lg:p-4"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[22px] border border-white/5">
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-full w-full"
              >
                <Image
                  src={heroImages[current].src}
                  alt={heroImages[current].alt}
                  fill
                  priority
                  sizes="(max-width:768px) 100vw, 1320px"
                  className="object-cover object-top select-none pointer-events-none"
                />
              </motion.div>
              <div className="absolute inset-0 rounded-[22px] bg-gradient-to-b from-white/5 via-transparent to-black/10" />
              <div className="absolute inset-0 rounded-[22px] ring-1 ring-white/10" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls (Arrows + Pagination) - নিচে নেওয়া হয়েছে */}
      <div className="mt-6 flex items-center justify-center gap-6">
        <button 
          onClick={previous} 
          className="h-12 w-12 flex items-center justify-center rounded-full bg-black/55 backdrop-blur-xl border border-white/10 text-white transition-all duration-300 hover:bg-[#38BDF8] hover:scale-105"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-300 ${
                current === index
                  ? "h-2.5 w-8 rounded-full bg-[#38BDF8]"
                  : "h-2.5 w-2.5 rounded-full bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button 
          onClick={next} 
          className="h-12 w-12 flex items-center justify-center rounded-full bg-black/55 backdrop-blur-xl border border-white/10 text-white transition-all duration-300 hover:bg-[#38BDF8] hover:scale-105"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}