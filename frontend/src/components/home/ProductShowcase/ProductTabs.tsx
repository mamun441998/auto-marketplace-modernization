"use client";

import { motion } from "framer-motion";
import { products } from "./ProductData";

type ProductTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function ProductTabs({
  activeTab,
  setActiveTab,
}: ProductTabsProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {products.map((product, index) => {
        const active = activeTab === product.id;
        const Icon = product.icon;

        return (
          <motion.button
            key={product.id}
            type="button"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => setActiveTab(product.id)}
            className={`
              relative w-full rounded-2xl border p-5 text-left transition-all duration-300 select-none
              ${
                active
                  ? "border-[#FC5E01] bg-gradient-to-br from-[#FC5E01] to-[#E5540A] shadow-xl text-white"
                  : "border-[#262626] bg-[#171717] hover:border-[#2d3d5e] hover:shadow-lg text-white"
              }
            `}
          >
            {active && (
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="absolute bottom-0 left-0 h-[3px] bg-white/60 rounded-full"
              />
            )}

            <div className="flex items-start gap-4">
              <div
                className={`
                  flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm
                  ${active ? "bg-white/20 text-white border border-white/20" : "bg-[#FC5E01]/10 text-[#FC5E01] border border-[#FC5E01]/20"}
                `}
              >
                <Icon size={24} strokeWidth={2} />
              </div>

              <div className="flex-1 min-w-0 pt-0.5">
                <h3 className="text-base font-bold tracking-tight text-white">
                  {product.title}
                </h3>
                <p className={`text-sm mt-1 leading-normal ${active ? "text-white/80" : "text-[#94A3B8]"}`}>
                  {product.subtitle}
                </p>

                <ul className="mt-3.5 space-y-2">
                  {product.features.slice(0, 3).map((feature) => (
                    <li key={feature} className={`flex items-center gap-2 text-xs font-semibold ${active ? "text-white/90" : "text-[#CBD5E1]"}`}>
                      <span className={`h-4.5 w-4.5 flex items-center justify-center rounded-full ${active ? "bg-white text-[#FC5E01]" : "bg-[#22C55E]/10 text-[#22C55E]"}`}>
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={4}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}