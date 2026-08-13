"use client";

import { useState, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "./TestimonialData";
import { fetchTestimonials } from "@/lib/content";

// Gradient palette used when deriving a card color from the testimonial id.
const GRADIENTS = [
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-fuchsia-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-sky-500 to-blue-600",
  "from-pink-500 to-rose-500",
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

type CardItem = {
  id: number;
  name: string;
  company: string;
  role: string;
  rating: number;
  avatar: string;
  gradient: string;
  quote: string;
};

export default function InfiniteMarquee() {
  const [isPaused, setIsPaused] = useState(false);
  const [items, setItems] = useState<CardItem[]>(testimonials as CardItem[]);

  useEffect(() => {
    let active = true;
    fetchTestimonials().then((data) => {
      if (!active) return;
      if (data.length > 0) {
        setItems(
          data.map((t) => ({
            id: t.id,
            name: t.name,
            company: t.company ?? "",
            role: t.role ?? "",
            rating: t.rating,
            avatar: initials(t.name),
            gradient: GRADIENTS[t.id % GRADIENTS.length],
            quote: t.quote,
          }))
        );
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const loopedSingleRow = Array(6).fill(items).flat();

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