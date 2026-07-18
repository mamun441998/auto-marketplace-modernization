"use client";

import { Menu, X } from "lucide-react";

type MobileMenuProps = {
  open: boolean;
  onToggle: () => void;
};

export default function MobileMenu({
  open,
  onToggle,
}: MobileMenuProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle Menu"
      aria-expanded={open}
      className="
        inline-flex

        h-11
        w-11

        items-center
        justify-center

        rounded-xl

        border
        border-white/10

        bg-white/5

        text-white

        backdrop-blur-xl

        transition-all
        duration-300

        hover:border-[#FD4A05]
        hover:bg-white/10
        hover:text-[#FD4A05]

        active:scale-95

        lg:hidden
      "
    >
      {open ? (
        <X size={20} strokeWidth={2.2} />
      ) : (
        <Menu size={20} strokeWidth={2.2} />
      )}
    </button>
  );
}