/**
 * Subtle blueprint grid, faded out toward the edges with a radial mask.
 * Pure CSS background — zero DOM nodes to animate, near-free to render.
 */
export default function HeroGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(15, 23, 42, 0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.045) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        WebkitMaskImage:
          "radial-gradient(ellipse 75% 60% at 50% 38%, #000 35%, transparent 100%)",
        maskImage:
          "radial-gradient(ellipse 75% 60% at 50% 38%, #000 35%, transparent 100%)",
      }}
    />
  );
}
