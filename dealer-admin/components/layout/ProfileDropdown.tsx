"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useProfile } from "./ProfileContext";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { avatarUrl } = useProfile();

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Defensive check: Ensure the avatar URL is genuine and not a string-based null/undefined
  const hasValidAvatar = 
    avatarUrl !== null && 
    avatarUrl.trim() !== "" && 
    avatarUrl !== "null" && 
    avatarUrl !== "undefined";

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 rounded-xl border border-[#1e2a4a] bg-[#111B33] pl-2 pr-3 py-1.5 hover:border-[#2d3d5e] transition-colors"
      >
        {hasValidAvatar ? (
          <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-lg">
            <Image src={avatarUrl!} alt="Profile" fill sizes="32px" className="object-cover" />
          </div>
        ) : (
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#FC5E01] text-white text-xs font-bold">
            JD
          </div>
        )}
        <div className="text-left hidden sm:block">
          <p className="text-xs font-bold text-white leading-none">John Doe</p>
          <p className="text-[10px] text-[#64748B] mt-0.5">Anderson Auto Group</p>
        </div>
        <ChevronDown size={14} className={`text-[#64748B] transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-30 mt-2 w-56 rounded-2xl border border-[#1e2a4a] bg-[#0C1A32] shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 border-b border-[#1e2a4a] px-4 py-3">
            {hasValidAvatar ? (
              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg">
                <Image src={avatarUrl!} alt="Profile" fill sizes="40px" className="object-cover" />
              </div>
            ) : (
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#FC5E01] text-white text-sm font-bold">
                JD
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">John Doe</p>
              <p className="text-xs text-[#64748B] truncate">john@andersonauto.com</p>
            </div>
          </div>

          <div className="p-1.5">
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-white hover:bg-[#111B33] transition-colors"
            >
              <User size={15} className="text-[#94A3B8]" />
              My Profile
            </Link>
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-white hover:bg-[#111B33] transition-colors"
            >
              <Settings size={15} className="text-[#94A3B8]" />
              Settings
            </Link>
          </div>

          <div className="border-t border-[#1e2a4a] p-1.5">
            <button
              onClick={() => {
                alert("Logged out (backend not connected yet)");
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-rose-400 hover:bg-[#111B33] transition-colors"
            >
              <LogOut size={15} />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}