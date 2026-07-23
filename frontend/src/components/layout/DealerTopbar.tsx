"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Bell,
  Search,
  Menu,
  LogOut,
  User,
  Settings,
  ChevronDown,
} from "lucide-react";

import { getUser, logout } from "@/lib/auth";

export default function DealerTopbar() {
  const router = useRouter();

  const [openProfile, setOpenProfile] = useState(false);

  const user = getUser();

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-800 bg-[#0A0F1E]/95 px-8 backdrop-blur-md">

      {/* Left */}
      <div className="flex items-center gap-6">

        <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden">
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative hidden md:block">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

          <input
            type="text"
            placeholder="Search inventory, leads..."
            className="w-80 rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-[#FC5E01] focus:outline-none"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <button className="relative rounded-xl bg-slate-900 p-3 transition hover:bg-slate-800">
          <Bell className="h-5 w-5 text-slate-300" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FC5E01]" />
        </button>

        {/* Profile */}
        <div className="relative">

          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 transition hover:border-[#FC5E01]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FC5E01] text-white font-semibold">
              {user?.name?.charAt(0).toUpperCase() || "D"}
            </div>

            <div className="hidden text-left lg:block">
              <h4 className="text-sm font-semibold text-white">
                {user?.name || "Dealer"}
              </h4>

              <p className="text-xs text-slate-400">
                {user?.email || "dealer@example.com"}
              </p>
            </div>

            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {openProfile && (
            <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-slate-700 bg-[#111827] shadow-2xl">

              <button
                onClick={() => router.push("/dealer-admin/profile")}
                className="flex w-full items-center gap-3 px-5 py-4 text-sm text-slate-300 transition hover:bg-slate-800"
              >
                <User className="h-4 w-4" />
                Profile
              </button>

              <button
                onClick={() => router.push("/dealer-admin/settings")}
                className="flex w-full items-center gap-3 px-5 py-4 text-sm text-slate-300 transition hover:bg-slate-800"
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>

              <hr className="border-slate-700" />

              <button
                onClick={logout}
                className="flex w-full items-center gap-3 px-5 py-4 text-sm text-red-400 transition hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}