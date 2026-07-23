"use client";

import { BadgeCheck, TrendingUp, ArrowRight } from "lucide-react";

interface SolutionBenefitsProps {
  title?: string;
  subtitle?: string;
  benefits?: string[];
}

export default function SolutionBenefits({
  title = "Business Benefits",
  subtitle = "Why dealerships choose this solution to grow smarter and faster.",
  benefits = [],
}: SolutionBenefitsProps) {
  return (
    <section className="relative overflow-hidden bg-[#0A0705] py-32">
      {/* Background Ambient Mesh Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#FC5E01]/5 blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-16 lg:grid-cols-12">
          {/* Left Column (Sticky Header info) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FC5E01]/30 bg-[#FC5E01]/10 px-4 py-2 text-sm font-semibold text-[#FC5E01]">
              <TrendingUp size={16} />
              Why It Matters
            </div>

            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:leading-[1.15]">
              {title}
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-gray-400">
              {subtitle}
            </p>

            <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#120E0C]/80 p-8 backdrop-blur-md relative">
              <div className="absolute top-0 right-0 h-32 w-32 bg-[#FC5E01]/10 rounded-full blur-2xl pointer-events-none" />
              <h4 className="text-xl font-bold text-white">
                Real Business Impact
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                Designed to deliver measurable results — from saving time on
                daily operations to increasing overall sales performance.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#FC5E01]">
                <span>See how dealerships benefit</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>

          {/* Right Column (Staggered Benefit List) */}
          <div className="lg:col-span-7">
            <div className="grid gap-6">
              {benefits.length > 0 ? (
                benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#120E0C]/60 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#FC5E01]/60 hover:bg-[#120E0C] hover:shadow-2xl hover:shadow-[#FC5E01]/10"
                  >
                    {/* Background Index Watermark Effect */}
                    <span className="absolute right-6 top-4 select-none text-7xl font-extrabold text-white/[0.03] transition-colors duration-300 group-hover:text-[#FC5E01]/10">
                      0{index + 1}
                    </span>

                    <div className="relative z-10 flex items-center gap-6">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FC5E01] to-[#d94e00] text-white shadow-lg shadow-[#FC5E01]/20 transition-transform duration-300 group-hover:scale-105">
                        <BadgeCheck size={24} />
                      </div>

                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#FC5E01]">
                          Benefit 0{index + 1}
                        </span>
                        <h3 className="text-xl font-bold text-white tracking-wide mt-1">
                          {benefit}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-white/10 bg-[#120E0C]/40 p-16 text-center text-gray-500">
                  No benefits available at the moment.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}