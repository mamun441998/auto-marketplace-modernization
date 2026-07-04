"use client";

import Link from "next/link";
import { navigation, NavDropdown } from "@/config/navigation";
import NavLink from "./NavLink";

export default function NavMenu() {
  const solutionsItem = navigation.find(
    (item): item is NavDropdown => "dropdown" in item && item.label === "Solutions"
  );

  if (!solutionsItem) return null;

  return (
    <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
      {navigation.map((item) => {
        if ("dropdown" in item) {
          return (
            <div key={item.id} className="group relative">
              {/* Solutions Button - White Text */}
              <button 
                className="flex items-center gap-1 text-sm font-medium text-white transition-colors hover:text-[#AA4D20]"
              >
                {item.label}
                <svg
                  className="h-4 w-4 transition-transform group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Solutions Dropdown - Dark Background */}
              <div className="absolute left-1/2 top-full z-50 hidden w-[520px] -translate-x-1/2 pt-2 group-hover:block">
                <div className="rounded-2xl border border-[#1e2a4a] bg-[#0C1A32] p-6 shadow-xl">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    {solutionsItem.dropdown.map((subItem) => (
                      <Link
                        key={subItem.id}
                        href={subItem.href}
                        className="block rounded-lg px-3 py-2 text-sm text-white transition-colors hover:bg-[#AA4D20]"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return (
          <NavLink key={item.id} href={item.href}>
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}