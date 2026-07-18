"use client";

import ProfileDropdown from "./ProfileDropdown";
import Link from "next/link";
import { ChevronDown, Plus } from "lucide-react";
import NotificationsDropdown from "./NotificationsDropdown";
import GlobalSearch from "./GlobalSearch";

export default function DealerTopbar() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#1e2a4a] bg-[#0A0F1E]/90 backdrop-blur px-6 py-4">
      {/* Search */}
      <GlobalSearch />

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Quick Add */}
        <Link
          href="/inventory/add"
          className="hidden sm:flex items-center gap-2 rounded-xl bg-[#FC5E01] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors"
        >
          <Plus size={16} />
          Add Vehicle
        </Link>

        {/* Notifications */}
        <NotificationsDropdown />

        {/* Profile */}
        <ProfileDropdown />

      </div>
    </header>
  );
}