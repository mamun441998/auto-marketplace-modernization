"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function NavAction() {
  return (
    <div className="hidden items-center gap-3 lg:flex">
      {/* Sign In */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 22,
        }}
      >
        <Link
          href="/sign-in"
          className="
            inline-flex
            h-9
            items-center
            justify-center
            rounded-xl
            border
            border-white/15
            bg-white/5
            px-4
            text-[14px]
            font-medium
            text-white
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-[#FC5E01]
            hover:bg-[#FC5E01]/10
            hover:text-[#FC5E01]
          "
        >
          Sign In
        </Link>
      </motion.div>

      {/* Get Started */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 22,
        }}
      >
        <Link
          href="/register"
          className="
            group
            inline-flex
            h-9
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#FC5E01]
            px-5
            text-[14px]
            font-semibold
            text-white
            shadow-[0_10px_30px_rgba(252,94,1,0.25)]
            transition-all
            duration-300
            hover:bg-[#E05300]
            hover:shadow-[0_16px_40px_rgba(252,94,1,0.45)]
          "
        >
          Get Started

          <ArrowRight
            size={16}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </Link>
      </motion.div>
    </div>
  );
}