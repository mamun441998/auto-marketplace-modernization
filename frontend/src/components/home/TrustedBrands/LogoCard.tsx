"use client";

import Image from "next/image";
import { Brand } from "./brands";

interface LogoCardProps { brand: Brand; }

export default function LogoCard({ brand }: LogoCardProps) {
  return (
    <div
      className="group relative flex h-16 w-44 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-sky-500/50 hover:bg-white/10"
      style={{ willChange: "transform" }}
    >
      {/* Tooltip */}
      <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-slate-900 border border-sky-500/30 px-3 py-1 rounded-lg">
          <p className="text-[10px] font-bold text-white whitespace-nowrap">{brand.name}</p>
        </div>
      </div>

      <Image
        src={brand.logo}
        alt={brand.name}
        width={120}
        height={40}
        className="h-8 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        draggable={false}
      />
    </div>
  );
}