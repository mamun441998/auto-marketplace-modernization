"use client";

export default function AuthBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#10203A] via-[#132845] to-[#10203A]" />

      {/* Premium Orange Glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 18% 12%, rgba(236,87,7,.14), transparent 32%),
            radial-gradient(circle at 85% 15%, rgba(236,87,7,.10), transparent 30%),
            radial-gradient(circle at 50% 100%, rgba(59,130,246,.06), transparent 42%)
          `,
        }}
      />

      {/* Subtle Grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top Right Glow */}
      <div className="absolute -top-64 -right-64 h-[760px] w-[760px] rounded-full bg-orange-500/10 blur-[220px]" />

      {/* Bottom Left Glow */}
      <div className="absolute -bottom-64 -left-64 h-[700px] w-[700px] rounded-full bg-blue-500/10 blur-[220px]" />

      {/* Center Soft Glow */}
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400/5 blur-[240px]" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#10203A]/20" />
    </div>
  );
}