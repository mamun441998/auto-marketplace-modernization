"use client";

import { motion } from "framer-motion";

export default function HeroHeading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mx-auto flex w-full max-w-[1200px] flex-col items-center text-center"
    >
      {/* Heading */}

     <h1
  className="
    font-extrabold
    tracking-[-0.04em]
    leading-[1.08]

    text-white

    text-[28px]
    sm:text-[34px]
    md:text-[38px]
    lg:text-[44px]
    xl:text-[48px]
    2xl:text-[52px]
  "
>
  {/* Mobile */}
  <span className="block md:hidden">
    The Complete
    <br />
    <span className="text-[#38BDF8]">
      Dealership Management Platform
    </span>
  </span>

  {/* Desktop */}
  <span className="hidden md:block">
    The Complete{" "}
    <span className="text-[#38BDF8]">
      Dealership Management Platform
    </span>
  </span>
</h1>
      {/* Description */}

      <p
        className="
          mt-4

          max-w-[680px]

          text-[14px]
          sm:text-[15px]
          md:text-[16px]

          leading-7

          text-[#94A3B8]
        "
      >
        All-in-one dealership platform: CRM, inventory, websites, marketing, and analytics
      </p>
    </motion.div>
  );
}