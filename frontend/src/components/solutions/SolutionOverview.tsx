"use client";

import { ReactNode } from "react";

interface OverviewItem {
  title: string;
  description: string;
  icon: ReactNode;
}

interface SolutionOverviewProps {
  title?: string;
  subtitle?: string;
  items: OverviewItem[];
}

export default function SolutionOverview({
  title = "Everything You Need",
  subtitle = "Powerful tools designed for modern dealerships.",
  items,
}: SolutionOverviewProps) {
  return (
    <section className="py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {title}
          </h2>

          <p className="mt-4 text-lg text-gray-400">
            {subtitle}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 hover:border-[#FC5E01] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#FC5E01]/15 flex items-center justify-center text-[#FC5E01] mb-6">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">
                {item.title}
              </h3>

              <p className="text-gray-400 leading-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}