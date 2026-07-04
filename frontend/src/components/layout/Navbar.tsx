"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import Container from "./Container";

import NavLogo from "./navbar/NavLogo";
import NavMenu from "./navbar/NavMenu";
import NavAction from "./navbar/NavAction";
import MobileMenu from "./navbar/MobileMenu";
import MobileNav from "./navbar/MobileNav";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  // Navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // ESC close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-[#1e2a4a] bg-[#0a1429]/95 shadow-lg backdrop-blur-xl"
          : "border-[#1e2a4a] bg-[#0a1429]/90 backdrop-blur-xl"
      )}
    >
      <Container>
        <div ref={navRef}>
          <div className="flex h-16 items-center justify-between">
            <NavLogo />
            <NavMenu />
            <div className="flex items-center gap-4 lg:mr-4">
              <NavAction />
              <MobileMenu open={open} onToggle={() => setOpen(!open)} />
            </div>
          </div>

          <MobileNav open={open} onClose={() => setOpen(false)} />
        </div>
      </Container>
    </header>
  );
}