"use client";

import LogoCard from "./LogoCard";
import { brands } from "./brands";

export default function Marquee() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Left Fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-32 bg-gradient-to-r from-[#0D111C] via-[#0D111C]/80 to-transparent" />

      {/* Right Fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-32 bg-gradient-to-l from-[#0D111C] via-[#0D111C]/80 to-transparent" />

      <div className="marquee-track">
        {[0, 1].map((group) => (
          <div
            key={group}
            className="marquee-group"
            aria-hidden={group === 1}
          >
            {brands.map((brand) => (
              <div
                key={`${group}-${brand.id}`}
                className="flex-shrink-0"
              >
                <LogoCard brand={brand} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        .marquee-track {
          display: flex;
          width: max-content;

          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;

          animation: marquee 45s linear infinite;
        }

        .marquee-group {
          display: flex;
          align-items: center;
          gap: 3.5rem;
          padding-right: 3.5rem;
          flex-shrink: 0;
        }

        @keyframes marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}