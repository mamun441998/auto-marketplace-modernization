"use client";

import { useEffect, useRef, useState } from "react";

const TOTAL_FEATURES = 5;

export interface UsePinnedFeatureReturn {
  sectionRef: React.RefObject<HTMLElement | null>;
  activeIndex: number;
}

export function usePinnedFeature(): UsePinnedFeatureReturn {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const currentIndex = useRef<number>(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      if (!sectionRef.current) {
        ticking = false;
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = rect.height - viewportHeight;

      if (totalScrollable <= 0) {
        ticking = false;
        return;
      }

      const progress = Math.max(
        0,
        Math.min(1, -rect.top / totalScrollable)
      );

      let index = Math.floor(progress * TOTAL_FEATURES);

      if (index >= TOTAL_FEATURES) {
        index = TOTAL_FEATURES - 1;
      }

      if (currentIndex.current !== index) {
        currentIndex.current = index;
        setActiveIndex(index);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return {
    sectionRef,
    activeIndex,
  };
}