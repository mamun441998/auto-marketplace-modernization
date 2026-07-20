"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FeatureItem } from "./featuresData";

interface Props {
  feature: FeatureItem;
}

export default function FeatureImage({ feature }: Props) {
  return (
    <div className="relative mx-auto w-full max-w-[900px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={feature.id}
          initial={{
            opacity: 0,
            scale: 0.95,
            x: 50,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            x: -50,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          style={{ willChange: "transform, opacity" }}
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-[#111216]
            shadow-[0_50px_120px_rgba(0,0,0,.55)]
          "
        >
          {/* Browser Top */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-[#15161B] px-4 py-3">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <div className="ml-3 h-5 w-[150px] sm:w-[180px] rounded-md bg-white/5" />
          </div>

          {/* Screenshot */}
          <div className="relative overflow-hidden w-full">
            <Image
              src={feature.image}
              alt={feature.title}
              width={1600}
              height={1000}
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          {/* Reflection */}
          <motion.div
            animate={{
              x: ["-120%", "160%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "linear",
            }}
            className="
              pointer-events-none
              absolute
              inset-y-0
              w-32
              rotate-12
              bg-white/10
              blur-xl
            "
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}