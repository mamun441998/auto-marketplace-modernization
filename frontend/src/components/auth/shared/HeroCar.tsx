"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroCar() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      className="
        pointer-events-none

        absolute

        bottom-0

        left-[56%]

        -translate-x-1/2

        z-0

       
      "
    >
      {/* Shadow */}

      <div
        className="
          absolute

          left-1/2
          bottom-6

          h-20
          w-[420px]

          -translate-x-1/2

          rounded-full

          bg-black/15

          blur-3xl
        "
      />

      {/* Car */}

      <Image
        src="/login-background-car.png"
        alt="MotoHave Hero Car"
        width={900}
        height={560}
        priority
        className="
          w-[720px]
          2xl:w-[820px]

          h-auto

          drop-shadow-[0_35px_60px_rgba(15,23,42,.22)]
        "
      />
    </motion.div>
  );
}