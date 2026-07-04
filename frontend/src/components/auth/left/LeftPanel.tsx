"use client";

import HeroTitle from "./HeroTitle";
import HeroFeatures from "./HeroFeatures";

export default function LeftPanel() {
  return (
    <div
      className="
        flex
        h-full
        w-full
        flex-col
        justify-center
      "
    >
      {/* Heading */}

      <div className="w-full">
        <HeroTitle />
      </div>

      {/* Features */}

      <div
        className="
          mt-12
          max-w-[520px]
        "
      >
        <HeroFeatures />
      </div>
    </div>
  );
}