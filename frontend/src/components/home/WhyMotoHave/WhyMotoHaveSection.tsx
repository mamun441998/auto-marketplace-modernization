import Container from "@/components/layout/Container";

import WhyMotoHaveHeader from "./WhyMotoHaveHeader";
import WhyMotoHaveContent from "./WhyMotoHaveContent";

export default function WhyMotoHaveSection() {
  return (
    <section
      className="
        relative
        overflow-hidden

        bg-slate-50

        py-16
        lg:py-20
      "
    >
      {/* Left Glow */}

      <div
        className="
          absolute

          -left-32
          top-20

          h-[420px]
          w-[420px]

          rounded-full

          bg-blue-400/15

          blur-[120px]

          hero-drift
        "
      />

      {/* Right Glow */}

      <div
        className="
          absolute

          -right-32
          bottom-0

          h-[420px]
          w-[420px]

          rounded-full

          bg-cyan-400/15

          blur-[120px]

          hero-drift-slow
        "
      />

      {/* Center Glow */}

      <div
        className="
          absolute

          left-1/2
          top-1/2

          h-[500px]
          w-[500px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-gradient-to-br
          from-blue-500/8
          via-cyan-400/5
          to-transparent

          blur-[160px]
        "
      />

      {/* Floating Particles */}

      <div
        className="
          absolute

          left-[10%]
          top-[18%]

          h-3
          w-3

          rounded-full

          bg-blue-400/40

          hero-float
        "
      />

      <div
        className="
          absolute

          right-[12%]
          top-[22%]

          h-2
          w-2

          rounded-full

          bg-cyan-400/50

          hero-float-slow
        "
      />

      <div
        className="
          absolute

          left-[22%]
          bottom-[18%]

          h-2.5
          w-2.5

          rounded-full

          bg-indigo-400/40

          hero-float
        "
      />

      <div
        className="
          absolute

          right-[22%]
          bottom-[25%]

          h-3
          w-3

          rounded-full

          bg-sky-400/35

          hero-float-slow
        "
      />

      <div
        className="
          absolute

          left-1/2
          top-[14%]

          h-2
          w-2

          -translate-x-1/2

          rounded-full

          bg-blue-500/40

          hero-pulse
        "
      />

      {/* Content */}

      <Container className="relative z-10">
        <WhyMotoHaveHeader />

        <WhyMotoHaveContent />
      </Container>
    </section>
  );
}