"use client";

import { motion } from "framer-motion";
import {
  dashboardMenus,
  DashboardMenuType,
} from "./data";

interface DashboardSidebarProps {
  activePage: DashboardMenuType;
  onChange: (page: DashboardMenuType) => void;
}

export default function DashboardSidebar({
  activePage,
  onChange,
}: DashboardSidebarProps) {
  return (
    <aside className="flex h-full flex-col bg-white">

      {/* Logo */}

      <div className="shrink-0 border-b border-slate-200 px-3 py-3 sm:px-5">
        <div className="flex items-center justify-center gap-2 sm:justify-start">
          <div
            className="
              grid
              h-8
              w-8
              shrink-0
              place-items-center

              rounded-lg

              bg-gradient-to-r
              from-blue-600
              to-cyan-500

              text-sm
              font-black
              text-white
            "
          >
            M
          </div>

          <div className="hidden min-w-0 sm:block">
            <h2 className="truncate text-lg font-black tracking-tight text-blue-600">
              MotoHave
            </h2>

            <p className="truncate text-[11px] text-slate-500">
              Dealer Management
            </p>
          </div>
        </div>
      </div>

      {/* MENU */}

      <div className="flex-1 overflow-y-auto px-2 py-3">
        <nav className="space-y-1 pb-8">
          {dashboardMenus.map((item) => {
            const Icon = item.icon;

            const active =
              activePage === item.id;

            return (
              <motion.button
                key={item.id}
                title={item.label}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onChange(item.id)}
                className={`
                  flex
                  w-full
                  items-center
                  gap-3

                  justify-center
                  sm:justify-start

                  rounded-xl

                  px-2
                  py-2.5
                  sm:px-4

                  transition-all

                  ${
                    active
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow"
                      : "text-slate-600 hover:bg-slate-100"
                  }
                `}
              >
                <Icon size={17} className="shrink-0" />

                <span className="hidden text-sm font-semibold sm:inline">
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* Footer */}

      <div className="hidden shrink-0 border-t border-slate-200 p-2 sm:block">
        <div className="rounded-lg bg-blue-50 p-3">
          <h4 className="text-xs font-bold text-blue-700">
            Interactive Demo
          </h4>

          <p className="mt-1 text-[11px] leading-4 text-slate-500">
            Click any module to preview.
          </p>
        </div>
      </div>
    </aside>
  );
}