/**
 * Floating accent dots + a ghost ring for depth.
 * Decorative only (aria-hidden, pointer-events-none). Sits behind the z-10 content.
 * Hidden on small screens where space is tight.
 */
export default function HeroShapes() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        hidden
        overflow-hidden
        lg:block
      "
    >
      <div
        className="
          hero-float
          absolute
          left-[7%]
          top-[24%]
          h-3
          w-3
          rounded-full
          bg-blue-500/50
        "
      />

      <div
        className="
          hero-float-slow
          absolute
          right-[15%]
          top-[16%]
          h-2
          w-2
          rounded-full
          bg-cyan-400/60
        "
      />

      <div
        className="
          hero-float
          absolute
          left-[42%]
          bottom-[14%]
          h-2.5
          w-2.5
          rounded-full
          bg-indigo-400/50
        "
        style={{ animationDelay: "1.4s" }}
      />

      <div
        className="
          hero-float-slow
          absolute
          right-[5%]
          bottom-[26%]
          h-16
          w-16
          rounded-full
          border
          border-blue-200/60
        "
      />
    </div>
  );
}
