"use client";

import { motion } from "framer-motion";
import { FeatureItem } from "./types";

type Props = {
  modules: FeatureItem[];
  active: string;
  onChange: (id: FeatureItem["id"]) => void;
};

export default function ProductTabs({
  modules,
  active,
  onChange,
}: Props) {
  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        justify-center
        gap-3
      "
    >
      {modules.map((item) => {
        const selected = active === item.id;

        return (
          <motion.button
            key={item.id}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(item.id)}
            className={`
              relative
              overflow-hidden

              rounded-full

              border

              px-5
              py-2.5

              text-sm
              font-semibold

              transition-all
              duration-300

              ${
                selected
                  ? "border-[#FC5E01] bg-[#FC5E01] text-white shadow-[0_0_28px_rgba(252,94,1,.25)]"
                  : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-white"
              }
            `}
          >
            {selected && (
              <motion.span
                layoutId="tab-glow"
                className="absolute inset-0 rounded-full bg-[#FC5E01]/40"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 28,
                }}
              />
            )}

            <span className="relative z-10">
              {item.title}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}