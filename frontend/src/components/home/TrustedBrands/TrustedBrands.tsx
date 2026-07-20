"use client";

import { motion } from "framer-motion";
import LogoCard from "./LogoCard";
import { brands } from "./brands";
import ParticleNetwork from "./ParticleNetwork";

export default function TrustedBrands() {
  const marqueeItems = [...brands, ...brands];

  return (
    <section className="relative w-full overflow-hidden bg-[#0D0D10] py-12">
      <div className="absolute inset-0 z-0">
        <ParticleNetwork />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2 className="text-center text-xl font-bold text-white mb-10">Direct Inventory Connection</h2>
        
        <div className="relative flex overflow-hidden">
          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#0D0D10] to-transparent" />
          <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#0D0D10] to-transparent" />

          <motion.div
            className="flex gap-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30, // Optimized speed
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {marqueeItems.map((brand, index) => (
              <LogoCard key={`${brand.id}-${index}`} brand={brand} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}