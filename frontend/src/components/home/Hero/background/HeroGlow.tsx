/**
 * Ambient aurora glows behind the hero.
 * Pure CSS — no JS, no framer-motion. Composited on the GPU (transform/opacity),
 * so it animates cheaply and never blocks the main thread.
 */
export default function HeroGlow() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
    >
      {/* Top-right blue / cyan */}

      <div
        className="
          hero-drift

          absolute
          -top-40
          right-[-12%]

          h-[520px]
          w-[520px]

          rounded-full

          bg-gradient-to-br
          from-blue-400/30
          via-cyan-300/20
          to-transparent

          blur-[120px]
        "
      />

      {/* Left indigo */}

      <div
        className="
          hero-drift-slow

          absolute
          top-1/3
          -left-28

          h-[440px]
          w-[440px]

          rounded-full

          bg-gradient-to-tr
          from-indigo-400/20
          to-transparent

          blur-[120px]
        "
      />

      {/* Bottom-center wash */}

      <div
        className="
          absolute
          bottom-[-25%]
          left-1/2

          h-[420px]
          w-[640px]

          -translate-x-1/2

          rounded-full

          bg-gradient-to-t
          from-cyan-200/25
          to-transparent

          blur-[130px]
        "
      />
    </div>
  );
}
