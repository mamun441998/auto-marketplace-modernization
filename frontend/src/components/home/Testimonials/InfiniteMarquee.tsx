"use client";

import { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "./TestimonialData";

const loopedSingleRow = Array(6).fill(testimonials).flat();

export default function InfiniteMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    /* 💡 overflow-hidden remove kora hoyeche jate card gulo baireo visible thake */
    <div className="relative mt-16 py-4">
      
      {/* 💡 Custom Infinite Continuous Loop CSS Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeLtr {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee-custom {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: marqueeLtr 50s linear infinite;
        }
      `}} />

      {/* Continuous Single Row */}
      <div
        className="animate-marquee-custom"
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {loopedSingleRow.map((item, index) => (
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

      {/* 💡 Side fade mask gulo completely delete kore deya hoyeche */}
    </div>
  );
}