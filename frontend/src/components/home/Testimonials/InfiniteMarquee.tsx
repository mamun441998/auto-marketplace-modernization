"use client";

import { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "./TestimonialData";

const firstRow = testimonials.slice(0, 3);
const secondRow = testimonials.slice(3);

// 💡 4 bar duplicate kora holo (age 2 bar chilo) - jate wide screen e o kono gap na thake
const loopedFirstRow = Array(4).fill(firstRow).flat();
const loopedSecondRow = Array(4).fill(secondRow).flat();

export default function InfiniteMarquee() {
  const [isRow1Paused, setIsRow1Paused] = useState(false);
  const [isRow2Paused, setIsRow2Paused] = useState(false);

  return (
    <div className="relative mt-16 space-y-6 overflow-hidden">
      {/* Top Row */}
      <div
        className="flex gap-5 sm:gap-6 w-max"
        style={{
          animation: "marquee-ltr 45s linear infinite",
          animationPlayState: isRow1Paused ? "paused" : "running",
        }}
        onMouseEnter={() => setIsRow1Paused(true)}
        onMouseLeave={() => setIsRow1Paused(false)}
        onTouchStart={() => setIsRow1Paused(true)}
        onTouchEnd={() => setIsRow1Paused(false)}
      >
        {loopedFirstRow.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="min-w-[260px] max-w-[260px] sm:min-w-[300px] sm:max-w-[300px] md:min-w-[320px] md:max-w-[320px] flex-shrink-0"
          >
            <TestimonialCard
              name={item.name}
              company={item.company}
              role={item.role}
              quote={item.quote}
              avatar={item.avatar}
              rating={item.rating}
              gradient={item.gradient}
            />
          </div>
        ))}
      </div>

      {/* Bottom Row */}
      <div
        className="flex gap-5 sm:gap-6 w-max"
        style={{
          animation: "marquee-rtl 48s linear infinite",
          animationPlayState: isRow2Paused ? "paused" : "running",
        }}
        onMouseEnter={() => setIsRow2Paused(true)}
        onMouseLeave={() => setIsRow2Paused(false)}
        onTouchStart={() => setIsRow2Paused(true)}
        onTouchEnd={() => setIsRow2Paused(false)}
      >
        {loopedSecondRow.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="min-w-[260px] max-w-[260px] sm:min-w-[300px] sm:max-w-[300px] md:min-w-[320px] md:max-w-[320px] flex-shrink-0"
          >
            <TestimonialCard
              name={item.name}
              company={item.company}
              role={item.role}
              quote={item.quote}
              avatar={item.avatar}
              rating={item.rating}
              gradient={item.gradient}
            />
          </div>
        ))}
      </div>

      {/* Left Fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />

      {/* Right Fade */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
    </div>
  );
}