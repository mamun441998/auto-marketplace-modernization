"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NavAction() {
  return (
    <div className="hidden items-center gap-3 lg:flex">
      {/* Sign In */}
      <Link
        href="/sign-in"
        className="
          inline-flex
          h-11
          items-center
          justify-center
          rounded-xl
          border
          border-white/15
          bg-white/5
          px-5
          text-[14px]
          font-medium
          text-white
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-[#38BDF8]
          hover:bg-white/10
          hover:text-[#38BDF8]
        "
      >
        Sign In
      </Link>

      {/* Get Started */}
      <Link
        href="/register"
        className="
          group
          inline-flex
          h-11
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[#38BDF8]
          px-6
          text-[14px]
          font-semibold
          text-[#0F172A]
          shadow-[0_10px_30px_rgba(56,189,248,0.30)]
          transition-all
          duration-300
          hover:-translate-y-[1px]
          hover:bg-[#30A2D5]
          hover:shadow-[0_16px_40px_rgba(48,162,213,0.45)]
        "
      >
        Get Started

        <ArrowRight
          size={16}
          className="
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />
      </Link>
    </div>
  );
}