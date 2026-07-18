"use client";

import { motion } from "framer-motion";
import LogoCard from "./LogoCard";
import { brands } from "./brands";
import ParticleNetwork from "./ParticleNetwork";

const marqueeItems = [...brands, ...brands, ...brands];

export default function TrustedBrands() {
  return (
    <section
      id="trusted-brands"
      className="relative w-full overflow-hidden bg-[#0D0D10] py-8 lg:py-10" // আরও কমানো হয়েছে
    >
      <div className="absolute inset-0 z-0 opacity-40">
        <ParticleNetwork />
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0D0D10] via-transparent to-[#0D0D10]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* হেডিং আরও টাইট করা হয়েছে */}
        <div className="mb-6 text-center">
          <span className="inline-block rounded-full border border-[#38BDF8]/20 bg-[#38BDF8]/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#38BDF8]">
            Syndication Networks
          </span>
          <h2 className="mt-1.5 text-lg font-bold text-white md:text-xl lg:text-2xl">
            Direct Inventory Connection
          </h2>
        </div>

        {/* মারকিউ কন্টেইনার */}
        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-20 bg-gradient-to-r from-[#0D0D10] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-20 bg-gradient-to-l from-[#0D0D10] to-transparent" />

          <motion.div
            className="flex w-max items-center gap-8" // গ্যাপ আরও কমানো হয়েছে
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {marqueeItems.map((brand, index) => (
              <LogoCard 
                key={`${brand.id}-${index}`} 
                brand={brand} 
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}