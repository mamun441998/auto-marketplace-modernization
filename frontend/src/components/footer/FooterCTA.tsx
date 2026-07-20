"use client";

import Link from "next/link";

export default function FooterCTA() {
  return (
    <div className="space-y-7">
      <h3 className="max-w-[400px] text-[28px] font-normal leading-[1.2] tracking-tight text-white md:text-[32px]">
        Start exploring and building with our latest dealership platform.
      </h3>

      <Link
        href="/register"
        className="inline-flex items-center justify-center rounded-full bg-[#FC5E01] px-7 py-3 text-[15px] font-semibold text-white shadow-lg shadow-[#FC5E01]/25 transition-all duration-200 hover:bg-[#E05300] hover:shadow-[#E05300]/30"
      >
        Sign up and get started
      </Link>
    </div>
  );
}