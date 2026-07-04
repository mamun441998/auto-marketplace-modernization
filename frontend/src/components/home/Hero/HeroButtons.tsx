"use client";

import Link from "next/link";

export default function HeroButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
      
      {/* Primary Button - Start Free Trial */}
      <Link
        href="/register"
        className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-[#FC5E01] px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#E55A00] active:scale-[0.985]"
      >
        Start Free Trial
      </Link>

      {/* Secondary Button - See Pricing */}
      <Link
        href="/pricing"
        className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-[#1e2a4a] bg-[#111B33] px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#1a263f] hover:border-[#FC5E01]"
      >
        See Pricing
      </Link>

    </div>
  );
}