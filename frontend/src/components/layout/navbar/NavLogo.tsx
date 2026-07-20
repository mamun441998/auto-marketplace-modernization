"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/navbar-logo/main-brand-logo.png";

export default function NavLogo() {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Jodi user already home page e thake, tahole page reload na kore just top e scroll korbe
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scrolling er jonno
      });
    }
  };

  return (
    <Link
      href="/"
      onClick={scrollToTop}
      className="flex items-center shrink-0 lg:ml-4"
      aria-label="MotoHave Home"
    >
      <Image
        src={logo}
        alt="MotoHave Logo"
        width={160}
        height={80}
        priority
        style={{ width: "auto", height: "auto" }}
        className="h-20 max-w-[240px] object-contain"
      />
    </Link>
  );
}