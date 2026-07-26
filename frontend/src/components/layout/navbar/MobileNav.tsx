"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { navigation } from "@/config/navigation";
import { useAuth } from "@/contexts/AuthContext";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileNav({
  open,
  onClose,
}: MobileNavProps) {
  const [solutionsOpen, setSolutionsOpen] =
    useState(false);

  const {
    authenticated,
    loading,
    logout,
  } = useAuth();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -20,
          }}
          transition={{
            duration: 0.28,
          }}
          className="
            border-t
            border-white/10
            bg-[#0B0B0A]
            backdrop-blur-2xl
            lg:hidden
          "
        >
          <div className="px-6 py-7">

            {/* Navigation */}

            <div className="space-y-2">
              {navigation.map((item) => {
                if ("dropdown" in item) {
                  return (
                    <div
                      key={item.id}
                      className="
                        rounded-2xl
                        border
                        border-white/5
                        bg-white/[0.02]
                      "
                    >
                      <button
                        onClick={() =>
                          setSolutionsOpen(!solutionsOpen)
                        }
                        className="
                          flex
                          w-full
                          items-center
                          justify-between
                          px-5
                          py-4
                          text-[15px]
                          font-semibold
                          text-white
                          transition-colors
                          hover:text-[#FD4A05]
                        "
                      >
                        {item.label}

                        <ChevronDown
                          size={18}
                          className={`
                            transition-transform
                            duration-300
                            ${
                              solutionsOpen
                                ? "rotate-180 text-[#FD4A05]"
                                : ""
                            }
                          `}
                        />
                      </button>

                      <AnimatePresence>
                        {solutionsOpen && (
                          <motion.div
                            initial={{
                              height: 0,
                              opacity: 0,
                            }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                            }}
                            transition={{
                              duration: 0.25,
                            }}
                            className="overflow-hidden"
                          >
                            <div
                              className="
                                border-t
                                border-white/5
                                px-5
                                py-3
                                space-y-1
                              "
                            >
                              {item.dropdown.map(
                                (subItem) => (
                                  <Link
                                    key={subItem.id}
                                    href={subItem.href}
                                    onClick={onClose}
                                    className="
                                      block
                                      rounded-xl
                                      px-3
                                      py-3
                                      text-[14px]
                                      text-white/80
                                      transition-all
                                      hover:bg-white/5
                                      hover:text-[#FD4A05]
                                    "
                                  >
                                    {subItem.label}
                                  </Link>
                                )
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={onClose}
                    className="
                      flex
                      items-center
                      rounded-2xl
                      border
                      border-white/5
                      bg-white/[0.02]
                      px-5
                      py-4
                      text-[15px]
                      font-medium
                      text-white
                      transition-all
                      hover:border-[#FD4A05]/20
                      hover:bg-white/5
                      hover:text-[#FD4A05]
                    "
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="my-8 h-px bg-white/10" />

            {!loading && (
              <div className="space-y-3">

                {authenticated ? (
                  <>
                    <Link
                      href="/dealer-admin/dashboard"
                      onClick={onClose}
                      className="
                        flex
                        h-12
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[#FD4A05]
                        text-[14px]
                        font-semibold
                        text-white
                      "
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        onClose();
                        logout();
                      }}
                      className="
                        flex
                        h-12
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-red-500/20
                        bg-red-500/10
                        text-[14px]
                        font-semibold
                        text-red-400
                        transition-all
                        hover:bg-red-500
                        hover:text-white
                      "
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      onClick={onClose}
                      className="
                        flex
                        h-12
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        text-[14px]
                        font-medium
                        text-white
                        transition-all
                        hover:border-[#FD4A05]
                        hover:text-[#FD4A05]
                      "
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/register"
                      onClick={onClose}
                      className="
                        group
                        flex
                        h-12
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[#FD4A05]
                        text-[14px]
                        font-semibold
                        text-white
                        shadow-[0_12px_30px_rgba(253,74,5,.30)]
                        transition-all
                        hover:bg-[#ff5a17]
                      "
                    >
                      Get Started

                      <ArrowRight
                        size={16}
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </Link>
                  </>
                )}

              </div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}