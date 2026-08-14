"use client";

import { Search, ChevronDown, UserPlus } from "lucide-react";

interface UsersFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedRole: string;
  onRoleChange: (role: string) => void;
  resultCount: number;
  onInviteClick: () => void;
}

const roleOptions = [
  { v: "all", l: "All Roles" },
  { v: "super_admin", l: "Super Admin" },
  { v: "admin", l: "Admin / Staff" },
  { v: "dealer", l: "Dealer" },
];

export default function UsersFilters({
  searchQuery, onSearchChange, selectedRole, onRoleChange, resultCount, onInviteClick,
}: UsersFiltersProps) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-[#1e2a4a] bg-[#111B33] px-4 py-2.5 w-full max-w-md">
          <Search size={16} className="text-[#64748B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full bg-transparent text-sm text-white placeholder:text-[#64748B] focus:outline-none"
          />
        </div>

        <button
          onClick={onInviteClick}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#FC5E01] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors sm:ml-auto"
        >
          <UserPlus size={16} />
          Create User
        </button>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-[#94A3B8]">
          Showing <span className="font-bold text-white">{resultCount}</span> users
        </p>

        <div className="relative">
          <select
            value={selectedRole}
            onChange={(e) => onRoleChange(e.target.value)}
            className="appearance-none rounded-xl border border-[#1e2a4a] bg-[#111B33] pl-4 pr-9 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-[#FC5E01] cursor-pointer"
          >
            {roleOptions.map((o) => (
              <option key={o.v} value={o.v} className="bg-[#0A0F1E]">{o.l}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}