"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { pricingFAQs } from "@/lib/pricing-data";

export default function PricingFAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="mt-28">
      {/* Section Heading */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Frequently Asked <span className="text-[#FC5E01]">Questions</span>
        </h2>
        <p className="mt-4 text-lg text-[#94A3B8]">
          Everything you need to know about our pricing and plans
        </p>
      </div>

      {/* Accordion */}
      <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-4">
        {pricingFAQs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className="rounded-xl border border-[#262626] bg-[#141414] transition-colors hover:border-[#2d3d5e]"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-base font-semibold text-white">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-[#FC5E01] transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-relaxed text-[#94A3B8]">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}