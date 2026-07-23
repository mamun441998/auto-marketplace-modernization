"use client";

import Image from "next/image";
import { HeroImage } from "../data/heroImages";

type HeroSlideProps = {
  image: HeroImage;
  priority?: boolean;
};

export default function HeroSlide({
  image,
  priority = false,
}: HeroSlideProps) {
  return (
    <div
      className="
        relative
        w-full
        aspect-[16/10]
        overflow-hidden
        rounded-[28px]
        bg-[#0F1115]
      "
    >
      {/* Dashboard Image */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes="(max-width:768px) 100vw, 1320px"
        className="
          object-cover
          object-center
          select-none
          pointer-events-none
        "
      />

      {/* Top Light */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-b
          from-white/5
          via-transparent
          to-transparent
        "
      />

      {/* Bottom Fade */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-black/20
          via-transparent
          to-transparent
        "
      />

      {/* Border */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[28px]
          ring-1
          ring-white/10
        "
      />
    </div>
  );
}