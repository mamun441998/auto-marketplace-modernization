"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface SolutionFAQProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
}

export default function SolutionFAQ({
  title = "Frequently Asked Questions",
  subtitle = "Everything dealerships usually ask before getting started.",
  faqs,
}: SolutionFAQProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-[#0B0A0B] py-24 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6">

        <div className="text-center mb-14">
          <span className="mb-3 inline-block rounded-full bg-[#FC5E01]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#FC5E01]">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            {title}
          </h2>

          <p className="mt-4 text-lg text-gray-400">
            {subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-[#120E0C]/80 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-[#FC5E01]/40"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-semibold text-white">
                  {faq.question}
                </span>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#FC5E01]">
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      open === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {open === index && (
                <div className="px-6 pb-6 text-gray-400 leading-7">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}