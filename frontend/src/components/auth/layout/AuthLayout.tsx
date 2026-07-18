"use client";

import { ReactNode } from "react";

import HeroCar from "../shared/HeroCar";
import AuthBackground from "../shared/AuthBackground";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <main className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#081120]">
      {/* =========================
          Premium Hero Background
      ========================== */}

      {/* Main Orange Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(
              ellipse 900px 650px
              at 55% 8%,
              rgba(236,87,7,.20) 0%,
              rgba(236,87,7,.10) 30%,
              rgba(236,87,7,.04) 50%,
              rgba(8,17,32,0) 72%
            )
          `,
        }}
      />

      {/* Right Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(
              circle 550px
              at 88% 45%,
              rgba(236,87,7,.10) 0%,
              rgba(236,87,7,.05) 40%,
              transparent 78%
            )
          `,
        }}
      />

      {/* Left Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(
              circle 450px
              at 5% 8%,
              rgba(59,130,246,.08) 0%,
              transparent 70%
            )
          `,
        }}
      />

      {/* Background Grid */}
      <AuthBackground />

      {/* Decorative Car */}
      <div
        className="
          absolute
          inset-0
          z-0
          -translate-y-10
          lg:-translate-y-14
          xl:-translate-y-16
        "
      >
        <HeroCar />
      </div>

      {/* ========================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-80px)]
          max-w-[1600px]
          items-center
          justify-between
          py-10
          lg:py-14
          px-6
          sm:px-10
          lg:px-20
          xl:px-28
        "
      >
        {/* ================= LEFT ================= */}

        <section
          className="
            hidden
            lg:flex
            h-full
            w-[50%]
            items-center
          "
        >
          <div
            className="
              w-full
              max-w-[560px]
              -translate-y-8
              lg:-translate-y-10
              xl:-translate-y-12
            "
          >
            {require("../left/LeftPanel").default()}
          </div>
        </section>

        {/* ================= RIGHT ================= */}

        <section
          className="
            flex
            w-full
            items-center
            justify-center
            lg:w-[42%]
            xl:w-[38%]
          "
        >
          <div
            className="
              w-full
              max-w-[430px]
              -translate-y-6
              lg:-translate-y-8
              xl:-translate-y-10
            "
          >
            {children}
          </div>
        </section>
      </div>

      {/* Bottom Fade */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-40
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,17,32,0) 0%, rgba(8,17,32,.35) 35%, rgba(8,17,32,.75) 100%)",
        }}
      />
    </main>
  );
}