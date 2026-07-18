"use client";

import ParticleNetwork from "./ParticleNetwork";

export default function HeroBackground() {
  return (
    <>
      {/* Main Background */}
      <div className="absolute inset-0 bg-[#0D0D10]" />

      {/* Top Glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 900px 600px
              at 50% 8%,
              rgba(45,190,255,.10) 0%,
              rgba(45,190,255,.05) 35%,
              transparent 75%
            )
          `,
        }}
      />

      {/* Center Glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle 700px
              at 50% 40%,
              rgba(0,180,255,.08) 0%,
              rgba(0,180,255,.04) 45%,
              transparent 75%
            )
          `,
        }}
      />

      {/* Left Glow */}
      <div
        className="
          absolute
          -left-44
          top-16
          h-[550px]
          w-[550px]
          rounded-full
          bg-sky-400/10
          blur-[150px]
        "
      />

      {/* Right Glow */}
      <div
        className="
          absolute
          -right-40
          top-24
          h-[520px]
          w-[520px]
          rounded-full
          bg-cyan-400/10
          blur-[150px]
        "
      />

      {/* Bottom Glow */}
      <div
        className="
          absolute
          left-1/2
          bottom-0
          h-[500px]
          w-[1000px]
          -translate-x-1/2
          rounded-full
          bg-sky-500/5
          blur-[180px]
        "
      />

      {/* Particle Animation */}
      <ParticleNetwork />
    </>
  );
}