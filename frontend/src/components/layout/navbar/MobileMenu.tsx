"use client";

import { Menu, X } from "lucide-react";

type MobileMenuProps = {
  open: boolean;
  onToggle: () => void;
};

export default function MobileMenu({ open, onToggle }: MobileMenuProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle Menu"
      aria-expanded={open}
      className="inline-flex h-16 w-16 items-center justify-center rounded-xl border border-[#1e2a4a] bg-[#0C1A32] text-white lg:hidden"
    >
      {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
}