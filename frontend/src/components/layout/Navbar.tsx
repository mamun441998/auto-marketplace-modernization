"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import NavLogo from "./navbar/NavLogo";
import NavMenu from "./navbar/NavMenu";
import NavAction from "./navbar/NavAction";
import MobileMenu from "./navbar/MobileMenu";
import MobileNav from "./navbar/MobileNav";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () =>
      document.removeEventListener("mousedown", handleOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () =>
      document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 border-b border-[#232326] bg-[#0D0D10]/95 backdrop-blur-xl transition-all duration-300",
        scrolled && "shadow-lg"
      )}
    >
      {/* FULL WIDTH */}
      <div className="w-full px-2 lg:px-4">
        <div ref={navRef}>
          <div className="flex h-[76px] items-center">

            {/* Logo */}
            <div className="shrink-0">
              <NavLogo />
            </div>

            {/* Menu */}
            <div className="ml-6 hidden lg:flex">
              <NavMenu />
            </div>

            {/* Push CTA Right */}
            <div className="flex-1" />

            {/* Right */}
            <div className="flex items-center gap-4">
              <NavAction />

              <MobileMenu
                open={open}
                onToggle={() => setOpen(!open)}
              />
            </div>

          </div>

          <MobileNav
            open={open}
            onClose={() => setOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}