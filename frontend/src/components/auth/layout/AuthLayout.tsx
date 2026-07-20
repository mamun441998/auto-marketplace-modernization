"use client";

import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({
  children,
}: AuthLayoutProps) => {
  return (
    <div className="relative isolate min-h-screen w-full overflow-hidden bg-[#091322]">

      {/* ========================================= */}
      {/* GRID BACKGROUND */}
      {/* ========================================= */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.06]
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.9) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.9) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ========================================= */}
      {/* ORANGE GLOW */}
      {/* ========================================= */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[900px]
          w-[900px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#FC5E01]/10
          blur-[180px]
        "
      />

      {/* ========================================= */}
      {/* BLUE GLOW */}
      {/* ========================================= */}

      <div
        className="
          absolute
          right-[-200px]
          top-[-200px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-sky-500/10
          blur-[160px]
        "
      />

      <div
        className="
          absolute
          left-[-200px]
          bottom-[-200px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-indigo-500/10
          blur-[160px]
        "
      />

      {/* ========================================= */}
      {/* BOTTOM FADE */}
      {/* ========================================= */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-40
          bg-gradient-to-t
          from-black/20
          to-transparent
        "
      />

      {/* ========================================= */}
      {/* CONTENT */}
      {/* ========================================= */}

      <main
        className="
          relative
          z-10
          flex
          min-h-screen
          w-full
          items-start
          justify-center
          px-3
          pt-0
          pb-6
          sm:px-6
          sm:pt-0
          lg:px-10
          lg:pt-0
          xl:px-12
        "
      >
        <div
          className="
            w-full
            max-w-[1500px]
            -mt-2
            sm:-mt-4
            lg:-mt-20
          "
        >
          {children}
        </div>
      </main>
    </div>
  );
};