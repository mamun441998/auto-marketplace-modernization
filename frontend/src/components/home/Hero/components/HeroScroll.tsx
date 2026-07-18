"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollDown() {
  const scrollToNextSection = () => {
    const hero = document.querySelector("section");

    if (!hero) return;

    const nextSection = hero.nextElementSibling as HTMLElement | null;

    if (!nextSection) return;

    nextSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <motion.button
      type="button"
      onClick={scrollToNextSection}
      aria-label="Scroll to next section"
      animate={{
        y: [0, 10, 0],
      }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="
        flex
        h-14
        w-14
        items-center
        justify-center

        rounded-full

        border
        border-white/10

        bg-white/5

        text-white

        backdrop-blur-xl

        transition-all
        duration-300

        hover:border-[#FD4A05]/50
        hover:bg-[#FD4A05]
        hover:text-white
      "
    >
      <ChevronDown size={24} />
    </motion.button>
  );
}