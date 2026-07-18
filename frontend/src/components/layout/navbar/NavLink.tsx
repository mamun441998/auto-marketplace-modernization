"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  children: React.ReactNode;
};

export default function NavLink({
  href,
  children,
}: Props) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      className="
        relative

        py-2

        text-[15px]
        font-medium

        transition-all
        duration-300
      "
    >
      <span
        className={`
          transition-colors
          duration-300

          ${
            active
              ? "text-[#FD4A05]"
              : "text-white hover:text-[#FD4A05]"
          }
        `}
      >
        {children}
      </span>

      {/* Bottom Line */}
      <span
        className={`
          absolute
          left-0
          -bottom-[7px]

          h-[2px]
          rounded-full

          bg-[#FD4A05]

          transition-all
          duration-300

          ${
            active
              ? "w-full"
              : "w-0 group-hover:w-full"
          }
        `}
      />

      {/* Hover Underline */}
      {!active && (
        <span
          className="
            absolute
            left-0
            -bottom-[7px]

            h-[2px]
            w-0

            rounded-full
            bg-[#FD4A05]

            transition-all
            duration-300

            hover:w-full
          "
        />
      )}
    </Link>
  );
}