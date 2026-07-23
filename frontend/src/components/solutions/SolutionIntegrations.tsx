"use client";

import { ReactNode } from "react";

interface IntegrationItem {
  name: string;
  icon: ReactNode;
}

interface SolutionIntegrationsProps {
  title?: string;
  subtitle?: string;
  integrations?: IntegrationItem[];
}

export default function SolutionIntegrations({
  title = "Integrations",
  subtitle = "Connect with the tools your dealership already uses.",
  integrations = [],
}: SolutionIntegrationsProps) {
  return (
    <section className="relative overflow-hidden bg-[#0B0A0B] py-28">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-[#FC5E01]/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-3 inline-block rounded-full bg-[#FC5E01]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#FC5E01]">
            Connected Ecosystem
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            {subtitle}
          </p>
        </div>

        {integrations.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {integrations.map((item, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#120E0C]/80 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#FC5E01]/60 hover:bg-[#120E0C] hover:shadow-xl hover:shadow-[#FC5E01]/10"
              >
                {/* Background Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#FC5E01]/0 to-[#FC5E01]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

                {/* Animated Icon Wrapper */}
                <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-[#FC5E01] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FC5E01]/10 group-hover:border-[#FC5E01]/30 group-hover:shadow-lg group-hover:shadow-[#FC5E01]/20">
                  <div className="transition-transform duration-500 group-hover:rotate-6">
                    {item.icon}
                  </div>
                </div>

                <h3 className="relative z-10 text-center font-semibold text-white tracking-wide transition-colors duration-300 group-hover:text-[#FC5E01]">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/10 bg-[#120E0C]/40 p-12 text-center text-gray-500">
            No integrations available at the moment.
          </div>
        )}
      </div>
    </section>
  );
}