"use client";

import motoM from "@/assets/Footer-logo/Moto-center.png";

export default function FooterBrand() {
  return (
    <div className="w-full select-none space-y-1">
      {/* Wordmark — [M-logo] O(🛞) T O(🛞) HAVE, centered */}
      <svg viewBox="0 0 760 128" className="block h-auto w-full" role="img" aria-label="MotoHave">
        <defs>
          <g id="mh-wheel">
            <circle r="37" fill="none" stroke="currentColor" strokeWidth="10" />
            <circle r="19" fill="none" stroke="currentColor" strokeWidth="3.5" />
            <g stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
              <line x1="0" y1="-9" x2="0" y2="-17" />
              <line x1="8.56" y1="-2.78" x2="16.17" y2="-5.25" />
              <line x1="5.29" y1="7.28" x2="9.99" y2="13.76" />
              <line x1="-5.29" y1="7.28" x2="-9.99" y2="13.76" />
              <line x1="-8.56" y1="-2.78" x2="-16.17" y2="-5.25" />
            </g>
            {/* চাকার ভেতরের ছোট ডটটি এখন ব্র্যান্ডের অরেঞ্জ কালার (#FC5E01) */}
            <circle r="4" fill="#FC5E01" />
          </g>
        </defs>

        {/* প্রথম M → তোমার logo image */}
        <image
          href={motoM.src}
          x="46" y="24"
          height="94" width="130"
          preserveAspectRatio="xMinYMid meet"
        />

        <g fontFamily="var(--font-fredoka), sans-serif" fontWeight="500" fontSize="120">
          <text x="255" y="118" fill="#ffffff">T</text>
          {/* HAVE টেক্সট কালার পরিবর্তন করে অরেঞ্জ (#FC5E01) করা হয়েছে */}
          <text x="427" y="118" fill="#FC5E01">HAVE</text>
        </g>

        <use href="#mh-wheel" x="212" y="75" className="text-white" />
        <use href="#mh-wheel" x="379" y="75" className="text-white" />
      </svg>

      {/* Tagline — centered */}
      <svg viewBox="0 0 760 30" className="block h-auto w-full" role="img" aria-label="Your Dream Dealership Platform">
        <text
          x="380" y="23" textAnchor="middle"
          textLength="740" lengthAdjust="spacing"
          fontFamily="var(--font-fredoka), sans-serif" fontWeight="500" fontSize="26"
          fill="#ffffff" opacity="0.5"
        >
          YOUR DREAM DEALERSHIP PLATFORM
        </text>
      </svg>
    </div>
  );
}