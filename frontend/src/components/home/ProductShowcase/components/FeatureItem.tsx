"use client";

import { motion } from "framer-motion";
import {
  CarFront,
  CreditCard,
  Globe,
  LayoutDashboard,
  Users,
  Activity,
} from "lucide-react";

import { ModuleItem } from "../types";

const icons = {
  dashboard: LayoutDashboard,
  inventory: CarFront,
  crm: Users,
  website: Globe,
  analytics: Activity,
};

interface Props {
  module: ModuleItem;
  active: boolean;
  onClick: () => void;
  index?: number;
}

export default function FeatureItem({
  module,
  active,
  onClick,
  index = 0,
}: Props) {
  const Icon =
    icons[module.id as keyof typeof icons] ??
    LayoutDashboard;

  return (
    <motion.div
      // ফ্লোটিং ইফেক্ট - জিপিইউ অপ্টিমাইজড ও ঝাঁকুনি মুক্ত
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.4,
      }}
      className="will-change-transform transform-gpu backface-visibility-hidden"
    >
      <motion.button
        onClick={onClick}
        whileHover={{
          scale: 1.08,
          boxShadow: "0 0 25px rgba(252,94,1,0.3)",
        }}
        whileTap={{
          scale: 0.95,
        }}
        className="
          group
          relative

          flex
          flex-col
          items-center
          justify-center

          rounded-full

          transition-all
          duration-300

          h-[78px]
          w-[78px]

          sm:h-[90px]
          sm:w-[90px]

          lg:h-[98px]
          lg:w-[98px]

          xl:h-[105px]
          xl:w-[105px]
        "
      >
        {/* Active Glow Aura */}
        {active && (
          <div className="absolute inset-0 rounded-full bg-[#FC5E01]/20 blur-[12px] pointer-events-none" />
        )}

        {/* Circle */}
        <div
          className={`
            relative
            z-10

            flex
            h-full
            w-full
            flex-col
            items-center
            justify-center

            rounded-full

            border

            backdrop-blur-xl

            transition-all
            duration-300

            ${
              active
                ? "border-[#FC5E01]/50 bg-[#171717] shadow-[0_0_20px_rgba(252,94,1,0.25)]"
                : "border-white/10 bg-[#141414] hover:border-white/20"
            }
          `}
        >
          {/* Inner Ring */}
          <div
            className={`
              absolute
              inset-[8px]

              rounded-full

              border

              ${
                active
                  ? "border-[#FC5E01]/30"
                  : "border-white/[0.05]"
              }
            `}
          />

          {/* Icon */}
          <Icon
            size={22}
            className={`
              relative
              z-20
              transition-colors

              ${
                active
                  ? "text-[#FC5E01]"
                  : "text-slate-400 group-hover:text-white"
              }
            `}
          />

          {/* Label - antialiased যোগ করা হয়েছে যাতে ফন্ট নিখুঁতভাবে রেন্ডার হয় */}
          <span
            className={`
              relative
              z-20

              mt-2

              text-center

              text-[8px]
              sm:text-[9px]
              lg:text-[10px]

              font-semibold

              uppercase

              tracking-wide

              leading-tight

              whitespace-nowrap
              overflow-hidden
              text-ellipsis
              px-1
              antialiased

              ${
                active
                  ? "text-white"
                  : "text-slate-400 group-hover:text-white"
              }
            `}
          >
            {module.title}
          </span>
        </div>
      </motion.button>
    </motion.div>
  );
}