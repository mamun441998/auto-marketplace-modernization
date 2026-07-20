"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

import {
  navigation,
  NavDropdown,
} from "@/config/navigation";

import NavLink from "./NavLink";

export default function NavMenu() {
  const solutionsItem = navigation.find(
    (item): item is NavDropdown =>
      "dropdown" in item &&
      item.label === "Solutions"
  );

  if (!solutionsItem) return null;

  return (
    <nav
      className="
        hidden
        items-center
        gap-10
        lg:flex
        mt-3
      "
    >
      {navigation.map((item) => {
        if ("dropdown" in item) {
          return (
            <div
              key={item.id}
              className="group relative"
            >
              {/* Solutions Button */}

              <button
                className="
                  flex
                  items-center
                  gap-1.5

                  text-[15px]
                  font-medium
                  text-white

                  transition-colors
                  duration-200

                  hover:text-[#FD4A05]
                "
              >
                {item.label}

                <ChevronDown
                  size={16}
                  className="
                    transition-transform
                    duration-300
                    group-hover:rotate-180
                  "
                />
              </button>

              {/* Dropdown */}

              <div
                className="
                  invisible
                  absolute
                  left-0
                  top-full
                  z-50

                  pt-5

                  opacity-0
                  translate-y-3

                  transition-all
                  duration-300

                  group-hover:visible
                  group-hover:translate-y-0
                  group-hover:opacity-100
                "
              >
                <div
                  className="
                    w-[560px]

                    rounded-3xl

                    border
                    border-white/10

                    bg-[#101C35]/95

                    p-6

                    shadow-[0_24px_80px_rgba(0,0,0,.35)]

                    backdrop-blur-2xl
                  "
                >
                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-3
                    "
                  >
                    {solutionsItem.dropdown.map(
                      (subItem) => (
                        <Link
                          key={subItem.id}
                          href={subItem.href}
                          className="
                            rounded-2xl

                            px-4
                            py-3

                            text-[14px]
                            font-medium
                            text-slate-200

                            transition-all
                            duration-200

                            hover:bg-[#FD4A05]
                            hover:text-white
                          "
                        >
                          {subItem.label}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return (
          <NavLink
            key={item.id}
            href={item.href}
          >
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}