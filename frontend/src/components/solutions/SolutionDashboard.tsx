"use client";

import { ReactNode } from "react";

interface DashboardStat {
  label: string;
  value: string;
}

interface SolutionDashboardProps {
  title?: string;
  subtitle?: string;
  image?: ReactNode;
  stats?: DashboardStat[];
}

export default function SolutionDashboard({
  title = "Powerful Dashboard",
  subtitle = "Everything you need inside one intelligent dealership platform.",
  image,
  stats = [],
}: SolutionDashboardProps) {
  return (
    <section className="py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            {title}
          </h2>

          <p className="mt-5 text-lg text-gray-400">
            {subtitle}
          </p>
        </div>

        <div className="relative">

          {/* Orange Glow */}
          <div className="absolute inset-0 flex justify-center">
            <div className="w-[600px] h-[300px] bg-[#FC5E01]/20 blur-[120px] rounded-full"></div>
          </div>

          {/* Browser */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#101827] shadow-2xl">

            {/* Browser Top */}
            <div className="h-12 bg-[#1C2434] border-b border-white/10 flex items-center px-5 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>

              <div className="ml-6 h-8 flex-1 rounded-lg bg-[#2A3448] flex items-center px-4 text-sm text-gray-400">
                https://dealer.motohave.com/dashboard
              </div>
            </div>

            {/* Dashboard */}
            <div className="relative aspect-[16/9] bg-[#0A0F1E] flex items-center justify-center">

              {image ? (
                image
              ) : (
                <div className="text-gray-500">
                  Dashboard Preview
                </div>
              )}

              {/* Floating Cards */}

              <div className="absolute top-8 left-8 rounded-2xl border border-white/10 bg-[#0F172A]/90 backdrop-blur p-5">
                <div className="text-xs text-gray-400">
                  Inventory
                </div>

                <div className="text-3xl font-bold text-white mt-2">
                  4,235
                </div>
              </div>

              <div className="absolute bottom-8 right-8 rounded-2xl border border-white/10 bg-[#0F172A]/90 backdrop-blur p-5">
                <div className="text-xs text-gray-400">
                  Monthly Sales
                </div>

                <div className="text-3xl font-bold text-[#FC5E01] mt-2">
                  +240%
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Stats */}

          {stats.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
                >
                  <div className="text-3xl font-bold text-[#FC5E01]">
                    {stat.value}
                  </div>

                  <div className="mt-2 text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </section>
  );
}