"use client";

import Image from "next/image";
import { Brand } from "./brands";

interface LogoCardProps {
  brand: Brand;
}

export default function LogoCard({ brand }: LogoCardProps) {
  return (
    <div
      className="
        group
        relative
        flex
        h-14
        w-40
        flex-shrink-0
        items-center
        justify-center
        rounded-xl
        border border-white/[0.01]
        bg-white/[0.005]
        px-5
        backdrop-blur-[1px]
        transition-all
        duration-500
        ease-out
        hover:scale-[1.02]
        hover:border-[#38BDF8]/20
        hover:bg-gradient-to-br
        hover:from-[#38BDF8]/5
        hover:to-transparent
        hover:shadow-[0_12px_24px_rgba(56,189,248,0.1),inset_0_1px_1px_rgba(255,255,255,0.03)]
        hover:-translate-y-1
      "
    >
      {/* 🌟 ব্লু বায়ো-গ্লো ইফেক্ট (অরেঞ্জ থেকে আপডেট করা) */}
      <div 
        className="
          absolute 
          inset-0 
          -z-10 
          rounded-xl 
          bg-gradient-to-tr 
          from-[#38BDF8]/20 
          via-transparent 
          to-transparent 
          opacity-0 
          blur-xl 
          transition-opacity 
          duration-500 
          group-hover:opacity-100
        " 
      />

      {/* 🚀 মডার্ন গ্লাস টুলটিপ */}
      <div 
        className="
          absolute 
          -top-12
          left-1/2
          -translate-x-1/2
          scale-90 
          opacity-0 
          pointer-events-none 
          bg-[#0D111C]/95 
          backdrop-blur-md
          border border-[#38BDF8]/20 
          px-3 
          py-1 
          rounded-lg
          shadow-[0_8px_16px_rgba(0,0,0,0.4)] 
          flex
          flex-col
          items-center
          z-50
          transition-all 
          duration-300 
          ease-out 
          group-hover:scale-100 
          group-hover:opacity-100 
          group-hover:-top-14
        "
      >
        <span className="text-[10px] font-bold text-white tracking-wide whitespace-nowrap">{brand.name}</span>
        <span className="text-[7px] font-medium text-[#94A3B8] tracking-widest uppercase mt-0.5">{brand.founded}</span>
      </div>

      {/* 🚘 কার ব্র্যান্ড লোগো */}
      <div className="relative h-6 w-28 transition-transform duration-500 group-hover:scale-[1.03]">
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          priority={false}
          draggable={false}
          className="
            object-contain
            opacity-30
            brightness-95
            contrast-125
            grayscale
            transition-all
            duration-500
            ease-out
            group-hover:opacity-100
            group-hover:grayscale-0
            group-hover:brightness-110
            group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]
          "
        />
      </div>
    </div>
  );
}