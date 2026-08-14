// admin/components/layout/SuperAdminTopbar.tsx
"use client";

import { Search, Bell, ChevronDown } from "lucide-react";

export default function SuperAdminTopbar() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#1e2a4a] bg-[#0A0F1E]/90 backdrop-blur px-6 py-4">
      {/* Search */}
      <div className="flex items-center gap-2 rounded-xl border border-[#1e2a4a] bg-[#111B33] px-4 py-2.5 w-full max-w-md">
        <Search size={16} className="text-[#64748B]" />
        <input
          type="text"
          placeholder="Search dealers, invoices, users..."
          className="w-full bg-transparent text-sm text-white placeholder:text-[#64748B] focus:outline-none"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#1e2a4a] bg-[#111B33] text-[#94A3B8] hover:text-white transition-colors">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FC5E01] text-[9px] font-bold text-white">
            5
          </span>
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2.5 rounded-xl border border-[#1e2a4a] bg-[#111B33] pl-2 pr-3 py-1.5 hover:border-[#2d3d5e] transition-colors">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FC5E01] text-white text-xs font-bold">
            SA
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold text-white leading-none">Super Admin</p>
            <p className="text-[10px] text-[#64748B] mt-0.5">Owner</p>
          </div>
          <ChevronDown size={14} className="text-[#64748B]" />
        </button>
      </div>
    </header>
  );
}