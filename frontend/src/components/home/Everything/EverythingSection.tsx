// src/components/home/Everything/EverythingSection.tsx
"use client";

import React from "react";
import EverythingHeader from "./EverythingHeader";
import EverythingGrid from "./EverythingGrid";

export default function EverythingSection() {
  return (
    <section className="relative w-full bg-[#0D0D10] py-16 md:py-24 lg:py-28 overflow-hidden border-t border-[#262626]">
      {/* Subtle dot pattern, dark-theme adapted */}
      <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center">
        <EverythingHeader />
        <EverythingGrid />
      </div>
    </section>
  );
}