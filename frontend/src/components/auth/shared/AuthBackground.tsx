"use client";

export default function AuthBackground() {
  return (
    <>
      {/* Main Background */}

      <div className="absolute inset-0 bg-[#F8FBFF]" />

      {/* Soft Blue Glow */}

      <div
        className="
          absolute
          left-[-180px]
          top-[120px]

          h-[520px]
          w-[520px]

          rounded-full

          bg-blue-400/10

          blur-[120px]
        "
      />

      <div
        className="
          absolute
          right-[-150px]
          top-[80px]

          h-[420px]
          w-[420px]

          rounded-full

          bg-cyan-300/12

          blur-[120px]
        "
      />

      {/* Center Dots */}

      <div
        className="
          absolute

          left-1/2
          top-[180px]

          -translate-x-1/2
        "
      >
        <div className="grid grid-cols-10 gap-3">
          {Array.from({ length: 100 }).map((_, index) => (
            <span
              key={index}
              className="h-[2px] w-[2px] rounded-full bg-blue-400/45"
            />
          ))}
        </div>
      </div>

      {/* Bottom Left Gradient */}

      <div
        className="
          absolute

          -left-[260px]
          -bottom-[260px]

          h-[720px]
          w-[720px]

          rounded-full

          bg-gradient-to-tr
          from-blue-700/75
          via-blue-500/45
          to-cyan-400/10

          blur-[35px]
        "
      />

      {/* Floating Circle */}

      <div
        className="
          absolute
          right-16
          bottom-16

          h-3
          w-3

          rounded-full

          bg-cyan-400/30
        "
      />

      <div
        className="
          absolute
          right-32
          top-52

          h-2
          w-2

          rounded-full

          bg-blue-500/30
        "
      />
    </>
  );
}