"use client";

import {
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  Palette,
  LayoutTemplate,
  ImageIcon,
} from "lucide-react";

export default function WebsiteBuilder() {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Website Builder
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Build your dealership website visually
          </p>
        </div>

        <button className="rounded-xl bg-[#FC5E01] px-5 py-2 text-sm font-semibold text-white">
          Publish
        </button>
      </div>

      {/* Top Toolbar */}

      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#17181D] px-5 py-4">
        <div className="flex items-center gap-4">
          <button className="rounded-lg bg-[#FC5E01]/15 p-2">
            <Monitor
              size={18}
              className="text-[#FC5E01]"
            />
          </button>

          <button className="rounded-lg p-2 hover:bg-white/5">
            <Tablet
              size={18}
              className="text-slate-400"
            />
          </button>

          <button className="rounded-lg p-2 hover:bg-white/5">
            <Smartphone
              size={18}
              className="text-slate-400"
            />
          </button>
        </div>

        <button className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/5">
          <Eye size={16} />
          Preview
        </button>
      </div>

      {/* Main */}

      <div className="grid gap-5 lg:grid-cols-[230px_1fr]">
        {/* Sidebar */}

        <div className="space-y-3 rounded-2xl border border-white/10 bg-[#17181D] p-4">
          {[
            {
              icon: LayoutTemplate,
              title: "Pages",
            },
            {
              icon: Palette,
              title: "Theme",
            },
            {
              icon: ImageIcon,
              title: "Media",
            },
            {
              icon: Globe,
              title: "SEO",
            },
          ].map((item) => (
            <button
              key={item.title}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-white/5"
            >
              <item.icon
                size={18}
                className="text-[#FC5E01]"
              />

              {item.title}
            </button>
          ))}
        </div>

        {/* Preview */}

        <div className="rounded-2xl border border-white/10 bg-[#101114] p-5">
          <div className="overflow-hidden rounded-xl border border-white/10">
            {/* Navbar */}

            <div className="flex items-center justify-between border-b border-white/10 bg-[#17181D] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-[#FC5E01]" />

                <div>
                  <div className="font-semibold text-white">
                    MotoHave Dealer
                  </div>

                  <div className="text-xs text-slate-500">
                    Premium Website
                  </div>
                </div>
              </div>

              <div className="flex gap-6 text-sm text-slate-400">
                <span>Inventory</span>
                <span>About</span>
                <span>Finance</span>
                <span>Contact</span>
              </div>
            </div>

            {/* Hero */}

            <div className="space-y-6 bg-gradient-to-br from-[#0E1117] to-[#17181D] px-8 py-10">
              <div className="h-5 w-48 rounded-full bg-white/10" />

              <div className="h-10 w-80 rounded-xl bg-white/10" />

              <div className="h-4 w-[85%] rounded-full bg-white/5" />

              <div className="flex gap-3 pt-2">
                <div className="h-10 w-32 rounded-xl bg-[#FC5E01]" />

                <div className="h-10 w-32 rounded-xl border border-white/10" />
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl border border-white/10 bg-[#17181D]"
                  >
                    <div className="h-24 bg-[#FC5E01]/15" />

                    <div className="space-y-2 p-4">
                      <div className="h-4 w-20 rounded bg-white/10" />

                      <div className="h-3 w-14 rounded bg-white/5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}