"use client";

import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaXTwitter, FaYoutube, FaInstagram } from "react-icons/fa6";

const social = [
  { label: "Facebook", href: "#", Icon: FaFacebookF, bg: "bg-[#1877F2]" },
  { label: "LinkedIn", href: "#", Icon: FaLinkedinIn, bg: "bg-[#0A66C2]" },
  { label: "X (Twitter)", href: "#", Icon: FaXTwitter, bg: "bg-black border border-white/20" },
  { label: "YouTube", href: "#", Icon: FaYoutube, bg: "bg-[#FF0000]" },
  { label: "Instagram", href: "#", Icon: FaInstagram, bg: "bg-gradient-to-tr from-[#FEDA75] via-[#D62976] to-[#4F5BD5]" },
];

/* সাদা card, logo edge-to-edge ভরানো */
const payments = [
  {
    label: "Visa",
    svg: (
      <svg viewBox="0 0 48 32" className="h-full w-full">
        <rect width="48" height="32" fill="#ffffff" />
        <text x="24" y="23" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontStyle="italic" fontSize="17" fill="#1A1F71" letterSpacing="0.5">VISA</text>
      </svg>
    ),
  },
  {
    label: "Mastercard",
    svg: (
      <svg viewBox="0 0 48 32" className="h-full w-full">
        <rect width="48" height="32" fill="#ffffff" />
        <circle cx="20" cy="16" r="10" fill="#EB001B" />
        <circle cx="28" cy="16" r="10" fill="#F79E1B" />
        <path d="M24 8.2a10 10 0 0 1 0 15.6 10 10 0 0 1 0-15.6z" fill="#FF5F00" />
      </svg>
    ),
  },
  {
    label: "American Express",
    svg: (
      <svg viewBox="0 0 48 32" className="h-full w-full">
        <rect width="48" height="32" fill="#ffffff" />
        <text x="24" y="21" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="12" fill="#1F72CF" letterSpacing="0.5">AMEX</text>
      </svg>
    ),
  },
  {
    label: "Stripe",
    svg: (
      <svg viewBox="0 0 48 32" className="h-full w-full">
        <rect width="48" height="32" fill="#ffffff" />
        <text x="24" y="22" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="14" fill="#635BFF" letterSpacing="-0.3">stripe</text>
      </svg>
    ),
  },
];

export default function FooterBottom() {
  return (
    <div className="mt-8 border-t border-white/10 pt-6">
      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">

        {/* বাঁ — Follow us + social */}
        <div className="flex items-center justify-center gap-3 md:justify-start">
          <span className="text-xs font-medium text-white/60">Follow us</span>
          <div className="flex items-center gap-2">
            {social.map(({ label, href, Icon, bg }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-white transition-transform hover:scale-110 ${bg}`}
              >
                <Icon size={13} />
              </Link>
            ))}
          </div>
        </div>

        {/* মাঝ — copyright */}
        <p className="text-center text-xs text-white/50">
          © {new Date().getFullYear()} MotoHave. All rights reserved.
        </p>

        {/* ডান — payment cards (edge-to-edge logo) */}
        <div className="flex flex-col items-center gap-2 md:items-end">
          <span className="text-[11px] font-medium text-white/50">We accept secure payments</span>
          <div className="flex items-center gap-2">
            {payments.map(({ label, svg }) => (
              <span
                key={label}
                aria-label={label}
                className="h-10 w-14 overflow-hidden rounded-md"
              >
                {svg}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}