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
          leading-[1.1]

          text-white

          /* Scaled down slightly more for a sharper look */
          text-[22px]
          sm:text-[25px]
          md:text-[28px]
          lg:text-[34px]
          xl:text-[38px]
          2xl:text-[42px]
        "
      >
        {/* Mobile View */}
        <span className="block md:hidden">
          The Complete
          <br />
          <span className="text-[#FC5E01]"> {/* Updated text color to match the orange theme */}
            Dealership Management Platform
          </span>
        </span>

        {/* Desktop View */}
        <span className="hidden md:block">
          The Complete{" "}
          <span className="text-[#FC5E01]"> {/* Updated text color to match the orange theme */}
            Dealership Management Platform
          </span>
        </span>
      </h1>

      {/* Description */}
      <p
        className="
          mt-3.5

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