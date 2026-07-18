"use client";

import { motion } from "framer-motion";

export default function HeroTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="
        ml-6
        sm:ml-10
        lg:ml-16
        -mt-44
      "
    >
      {/* Badge */}
      <div
        className="
          inline-flex
          items-center
          rounded-full

          border
          border-[#EC5707]/20

          bg-[#1B2A49]/80

          px-5
          py-2

          backdrop-blur-md
        "
      >
        <span
          className="
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-[#EC5707]
          "
        >
          MODERN DEALERSHIP PLATFORM
        </span>
      </div>

      {/* Heading */}
      <h1
        className="
          mt-5
          whitespace-nowrap

          text-[18px]
          sm:text-[24px]
          lg:text-[30px]
          xl:text-[34px]

          font-black
          leading-[1.1]
          tracking-[-0.03em]

          text-white
        "
      >
        Drive Your Dealership{" "}
        <span className="text-[#EC5707]">
          To The Next Level
        </span>
      </h1>

      {/* Description */}
      <p
        className="
          mt-3
          max-w-[520px]

          text-[18px]
          font-semibold
          leading-7

          text-slate-300
        "
      >
        One Platform to Manage Your Dealership All Operations.
      </p>
    </motion.div>
  );
}