"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroCar() {
  return (
    <div className="relative h-[470px] w-full overflow-visible">

      {/* Blue Gradient Blob */}

      <div
        className="
          absolute

          -bottom-[220px]
          -left-[240px]

          h-[620px]
          w-[1100px]

          rounded-[50%]

          bg-gradient-to-r
          from-blue-700
          via-blue-600
          to-cyan-500

          opacity-95
        "
      />

      {/* Soft Glow */}

      <div
        className="
          absolute

          left-[180px]
          bottom-[70px]

          h-[260px]
          w-[260px]

          rounded-full

          bg-cyan-300/30

          blur-[110px]
        "
      />

      {/* Dashboard Floating */}

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: .4,
        }}
        className="
          absolute

          right-[120px]
          top-0

          z-20

          overflow-hidden

          rounded-3xl

          border
          border-white/70

          bg-white/90

          shadow-[0_30px_60px_rgba(15,23,42,.16)]
        "
      >
        {/* পরে এখানে dashboard image দিবে */}

        <Image
          src="/dashboard-preview.png"
          alt="Dashboard"
          width={340}
          height={210}
          className="object-cover"
        />
      </motion.div>

      {/* Car */}

      <motion.div
        initial={{
          opacity: 0,
          x: 80,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: .8,
        }}
        className="
          absolute

          bottom-0
          right-0

          z-10
        "
      >
        <Image
          src="/hero-image.png"
          alt="MotoHave"

          width={860}
          height={520}

          priority

          className="
            w-[760px]

            drop-shadow-[0_35px_70px_rgba(15,23,42,.22)]
          "
        />
      </motion.div>
    </div>
  );
}