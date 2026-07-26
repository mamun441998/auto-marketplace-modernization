"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

import { useAuth } from "@/contexts/AuthContext";

export default function DealerTopbar() {
  const router = useRouter();

  const { user, logout } = useAuth();

  const profileRef = useRef<HTMLDivElement>(null);

  const [openProfile, setOpenProfile] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Close Dropdown
  |--------------------------------------------------------------------------
  */

  const closeProfile = useCallback(() => {
    setOpenProfile(false);
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Outside Click
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        closeProfile();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [closeProfile]);

  /*
  |--------------------------------------------------------------------------
  | ESC Key
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeProfile();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [closeProfile]);

  /*
  |--------------------------------------------------------------------------
  | Profile Navigation
  |--------------------------------------------------------------------------
  */

  const goToProfile = () => {
    closeProfile();
    router.push("/dealer-admin/profile");
  };

  const goToSettings = () => {
    closeProfile();
    router.push("/dealer-admin/settings");
  };

  const handleLogout = async () => {
    closeProfile();
    await logout();
  };

  const initials =
    user?.name?.charAt(0)?.toUpperCase() ?? "D";

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-800 bg-[#0A0F1E]/95 px-5 backdrop-blur-md lg:px-8">
      {/* Left */}

      <div className="flex items-center gap-5">
        <button
          type="button"
          className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
          aria-label="Open Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search */}

        <div className="relative hidden md:block">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

          <input
            type="search"
            placeholder="Search inventory, leads..."
            className="w-72 rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 transition focus:border-[#FC5E01] focus:outline-none lg:w-80"
          />
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">
        {/* Notification */}

        <button
          type="button"
          className="relative rounded-xl bg-slate-900 p-3 transition hover:bg-slate-800"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-slate-300" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FC5E01]" />
        </button>

        {/* Profile */}

        <div
          ref={profileRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() =>
              setOpenProfile((prev) => !prev)
            }
            className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 transition hover:border-[#FC5E01]"
            aria-expanded={openProfile}
            aria-haspopup="menu"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FC5E01] text-sm font-semibold text-white">
              {initials}
            </div>

            <div className="hidden text-left lg:block">
              <p className="text-sm font-semibold text-white">
                {user?.name ?? "Dealer"}
              </p>

              <p className="text-xs text-slate-400">
                {user?.email ?? ""}
              </p>
            </div>

            <ChevronDown
              className={`h-4 w-4 text-slate-400 transition-transform ${
                openProfile ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}

          {openProfile && (
            <div
              className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-slate-700 bg-[#111827] shadow-2xl"
              role="menu"
            >
              <button
                type="button"
                onClick={goToProfile}
                className="flex w-full items-center gap-3 px-5 py-4 text-left text-sm text-slate-300 transition hover:bg-slate-800"
              >
                <User className="h-4 w-4" />
                Profile
              </button>

              <button
                type="button"
                onClick={goToSettings}
                className="flex w-full items-center gap-3 px-5 py-4 text-left text-sm text-slate-300 transition hover:bg-slate-800"
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>

              <div className="border-t border-slate-700" />

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-5 py-4 text-left text-sm text-red-400 transition hover:bg-red-500/10"
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