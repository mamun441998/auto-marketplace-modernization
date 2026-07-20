"use client";

import ParticleNetwork from "./ParticleNetwork";

export default function HeroBackground() {
  return (
    <>
      {/* Base Background */}
      <div className="absolute inset-0 bg-[oklch(0.16_0.008_260)]" />

      {/* Animated Aurora Layer */}
      <div
        className="
          absolute inset-0
          opacity-80
          animate-[aurora_18s_ease-in-out_infinite]
        "
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(252,94,1,.18), transparent 40%),
            radial-gradient(circle at 80% 10%, rgba(59,130,246,.12), transparent 35%),
            radial-gradient(circle at 50% 55%, rgba(14,165,233,.10), transparent 45%),
            radial-gradient(circle at 80% 80%, rgba(252,94,1,.08), transparent 40%)
          `,
        }}
      />

      {/* Mesh Gradient */}
      <div
        className="
          absolute
          inset-0
          opacity-40
          animate-[aurora_28s_linear_infinite_reverse]
        "
        style={{
          background: `
            radial-gradient(circle at 15% 65%, rgba(56,189,248,.08), transparent 40%),
            radial-gradient(circle at 85% 40%, rgba(252,94,1,.10), transparent 42%),
            radial-gradient(circle at 55% 90%, rgba(37,99,235,.08), transparent 38%)
          `,
        }}
      />

      {/* Orange Glow */}
      <div
        className="
          absolute
          -left-52
          top-16
          h-[650px]
          w-[650px]
          rounded-full
          bg-[#FC5E01]/12
          blur-[170px]
        "
      />

      {/* Blue Glow */}
      <div
        className="
          absolute
          -right-52
          top-12
          h-[650px]
          w-[650px]
          rounded-full
          bg-sky-500/10
          blur-[170px]
        "
      />

      {/* Center Glow */}
      <div
        className="
          absolute
          left-1/2
          top-[18%]
          h-[500px]
          w-[900px]
          -translate-x-1/2
          rounded-full
          bg-[#FC5E01]/6
          blur-[190px]
        "
      />

      {/* Bottom Glow */}
      <div
        className="
          absolute
          left-1/2
          bottom-[-180px]
          h-[650px]
          w-[1200px]
          -translate-x-1/2
          rounded-full
          bg-sky-500/6
          blur-[220px]
        "
      />

      {/* Noise Texture */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.025]
          mix-blend-soft-light
          pointer-events-none
        "
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Grid Overlay */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Particle Network */}
      <ParticleNetwork />
    </>
  );
}