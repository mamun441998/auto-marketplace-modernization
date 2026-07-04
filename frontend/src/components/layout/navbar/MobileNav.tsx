"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navigation } from "@/config/navigation";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="border-t border-[#1e2a4a] bg-[#0C1A32] lg:hidden"
        >
          <div className="px-6 py-8">
            {/* Navigation Links */}
            <div className="flex flex-col gap-4">
              {navigation.map((item) => {
                // Solutions Dropdown (Toggle)
                if ("dropdown" in item) {
                  return (
                    <div key={item.id}>
                      <button
                        onClick={() => setSolutionsOpen(!solutionsOpen)}
                        className="flex w-full items-center justify-between text-sm font-semibold text-white"
                      >
                        {item.label}
                        <span className={`transition-transform ${solutionsOpen ? "rotate-180" : ""}`}>
                          ▼
                        </span>
                      </button>

                      {/* Submenu */}
                      {solutionsOpen && (
                        <div className="ml-4 mt-3 flex flex-col gap-3 border-l border-[#1e2a4a] pl-4">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.id}
                              href={subItem.href}
                              onClick={onClose}
                              className="text-sm text-white hover:text-[#AA4D20] transition-colors"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                // Normal Links
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={onClose}
                    className="text-sm text-white hover:text-[#AA4D20] transition-colors py-1"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <Link
                href="/sign-in"
                onClick={onClose}
                className="block w-full rounded-lg border border-white/30 py-3 text-center text-sm font-medium text-white hover:bg-white/5 hover:border-[#AA4D20] transition-all"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                onClick={onClose}
                className="block w-full rounded-lg bg-[#FF6B00] py-3 text-center text-sm font-semibold text-white hover:bg-[#AA4D20] transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}