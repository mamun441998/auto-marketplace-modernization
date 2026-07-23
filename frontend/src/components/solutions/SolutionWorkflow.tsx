"use client";

import { ArrowRight } from "lucide-react";

interface WorkflowStep {
  title: string;
  description: string;
}

interface SolutionWorkflowProps {
  title?: string;
  subtitle?: string;
  workflow?: WorkflowStep[];
}

export default function SolutionWorkflow({
  title = "How It Works",
  subtitle = "A simple, streamlined workflow from start to finish.",
  workflow = [
    {
      title: "Choose Your Vehicle",
      description: "Browse our extensive inventory and select the car that fits your style and needs."
    },
    {
      title: "Schedule a Test Drive",
      description: "Pick a convenient time to test drive your chosen vehicle with our expert team."
    },
    {
      title: "Secure Financing",
      description: "Get quick approval with our flexible and transparent financing options."
    },
    {
      title: "Drive Away",
      description: "Complete the final paperwork and drive off happily in your new car."
    }
  ],
}: SolutionWorkflowProps) {
  return (
    <section className="relative overflow-hidden bg-[#0B0A0B] py-32">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#FC5E01]/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-24 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#FC5E01]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#FC5E01]">
            Seamless Process
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            {subtitle}
          </p>
        </div>

        {workflow.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-4">
            {workflow.map((item, index) => (
              <div
                key={index}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#120E0C]/80 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#FC5E01]/50 hover:bg-[#120E0C] hover:shadow-2xl hover:shadow-[#FC5E01]/10"
              >
                <div>
                  {/* Step Number & Icon Indicator */}
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FC5E01] to-[#d94e00] text-xl font-bold text-white shadow-lg shadow-[#FC5E01]/30 transition-transform duration-300 group-hover:scale-110">
                      0{index + 1}
                    </div>
                    <span className="text-xs font-medium uppercase tracking-widest text-gray-500">
                      Step {index + 1}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3 className="mb-3 text-2xl font-bold text-white tracking-wide">
                    {item.title}
                  </h3>

                  {/* Step Description (Dynamic Details) */}
                  <p className="text-sm leading-relaxed text-gray-400">
                    {item.description}
                  </p>
                </div>

                {/* Card Bottom Accent Line */}
                <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-[#FC5E01] to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                </div>

                {/* Connecting Arrow for Desktop */}
                {index !== workflow.length - 1 && (
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden lg:flex h-8 w-8 items-center justify-center rounded-full bg-[#120E0C] border border-white/10 text-[#FC5E01] shadow-md">
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/10 bg-[#120E0C]/40 p-12 text-center text-gray-500">
            No workflow steps available at the moment.
          </div>
        )}
      </div>
    </section>
  );
}