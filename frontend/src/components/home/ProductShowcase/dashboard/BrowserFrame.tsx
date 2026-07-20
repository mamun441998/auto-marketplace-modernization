"use client";

import { Globe, Lock } from "lucide-react";

interface BrowserFrameProps {
  children: React.ReactNode;
  url: string;
}

export default function BrowserFrame({
  children,
  url,
}: BrowserFrameProps) {
  return (
    <div
      className="
        w-full

        overflow-hidden

        rounded-[26px]

        border
        border-white/10

        bg-[#111216]

        shadow-[0_35px_90px_rgba(0,0,0,.45)]
      "
    >
      {/* Browser Header */}

      <div
        className="
          flex
          items-center
          justify-between

          border-b
          border-white/5

          bg-[#18191D]

          px-4
          py-3

          sm:px-5

          lg:px-6
        "
      >
        {/* Left */}

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />

          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />

          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>

        {/* URL */}

        <div
          className="
            mx-5

            hidden

            flex-1

            items-center
            gap-2

            rounded-full

            border
            border-white/10

            bg-[#0F1014]

            px-4
            py-2

            sm:flex

            max-w-[260px]

            md:max-w-[360px]

            lg:max-w-[450px]
          "
        >
          <Lock
            size={13}
            className="text-[#FC5E01]"
          />

          <span className="truncate text-xs text-slate-400">
            {url}
          </span>

          <Globe
            size={14}
            className="ml-auto text-slate-500"
          />
        </div>

        {/* Right */}

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />

          <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />

          <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
        </div>
      </div>

      {/* Browser Body */}

      <div
        className="
          aspect-[16/10]

          w-full

          overflow-hidden

          bg-[#0D0D10]
        "
      >
        {children}
      </div>
    </div>
  );
}