"use client";

import FeatureOrbit from "./FeatureOrbit";
import FeatureCenter from "./FeatureCenter";
import OrbitBackground from "./OrbitBackground";
import { motion } from "framer-motion";

import { FeatureItem } from "../types";

type Props = {
  features: FeatureItem[];
  active: string;
  radius: number;
  onSelect: (id: FeatureItem["id"]) => void;
};

export default function FeatureCircle({
  features,
  active,
  radius,
  onSelect,
}: Props) {
  return (
    <div
      className="
        relative
        flex
        items-center
        justify-center
        mx-auto
        lg:mx-0

        h-[340px]
        w-[340px]

        sm:h-[390px]
        sm:w-[390px]

        md:h-[430px]
        md:w-[430px]

        lg:h-[470px]
        lg:w-[470px]

        xl:h-[520px]
        xl:w-[520px]

        select-none
      "
    >
      {/* Deep Center Glassmorphism Backdrop */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          h-[260px]
          w-[260px]
          rounded-full
          bg-[#111216]/60
          backdrop-blur-xl
          border
          border-white/[0.08]
          shadow-[0_0_50px_rgba(0,0,0,0.6)]
          pointer-events-none
        "
      />

      {/* Pulsing Luminous Orange Core Aura */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          h-[200px]
          w-[200px]
          rounded-full
          bg-gradient-to-tr
          from-[#FC5E01]/35
          via-[#FF8A3D]/20
          to-transparent
          blur-[50px]
          pointer-events-none
        "
      />

      {/* Background Animated Rings */}
      <OrbitBackground />

      {/* Orbit Items */}
      <FeatureOrbit
        features={features}
        activeFeature={active}
        radius={radius}
        onSelect={onSelect}
      />

      {/* Center Logo */}
      <FeatureCenter />
    </div>
  );
}