"use client";

import { CheckCircle2, Sparkles } from "lucide-react";

interface FeatureItem {
  title: string;
  description: string;
}

interface SolutionFeaturesProps {
  title?: string;
  subtitle?: string;
  features?: FeatureItem[];
}

export default function SolutionFeatures({
  title = "Key Features",
  subtitle = "Everything included in this solution to help your dealership grow faster.",
  features = [],
}: SolutionFeaturesProps) {
  return (
    <section className="relative overflow-hidden bg-[#0B0B0A] py-28">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-16 lg:grid-cols-3">
          {/* Left Content */}
          <div className="lg:sticky lg:top-28">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FC5E01]/30 bg-[#FC5E01]/10 px-4 py-2 text-sm font-semibold text-[#FC5E01]">
              <Sparkles size={16} />
              Features
            </div>

            <h2 className="text-4xl font-bold text-white">
              {title}
            </h2>

            <p className="mt-6 leading-8 text-gray-400">
              {subtitle}
            </p>

            <div className="mt-10 rounded-3xl border border-[#FC5E01]/20 bg-[#121826] p-6">
              <h4 className="text-xl font-semibold text-white">
                Why it matters?
              </h4>

              <p className="mt-4 text-gray-400">
                Every feature is designed to reduce manual work,
                automate dealership operations and increase vehicle sales.
              </p>
            </div>
          </div>

          {/* Right Cards */}
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-6">
              {features.length > 0 ? (
                features.map((feature, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#121826] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#FC5E01] hover:shadow-[0_0_40px_rgba(252,94,1,.15)]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-6 relative z-10">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0B0B0A] border border-white/10 transition group-hover:border-[#FC5E01]">
                        <CheckCircle2 className="text-[#FC5E01] transition-colors" />
                      </div>

                      <div>
                        <h3 className="mb-3 text-xl font-bold text-white">
                          {feature.title}
                        </h3>

                        <p className="leading-7 text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-white/10 bg-[#121826] p-16 text-center text-gray-500">
                  No features available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}