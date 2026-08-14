"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useProfile } from "./ProfileContext";
import { getUser, clearAuth, FRONTEND_URL } from "@/lib/auth";
import { fetchMyDealer } from "@/lib/dealer";
import { apiPost } from "@/lib/apiClient";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { avatarUrl } = useProfile();

  const [name, setName] = useState("User");
  const [email, setEmail] = useState("");
  const [dealership, setDealership] = useState("");
  const [imgFailed, setImgFailed] = useState(false);

  /* যদি avatar URL বদলায়, error state reset করো */
  useEffect(() => {
    setImgFailed(false);
  }, [avatarUrl]);

  /* আসল user + dealership load */
  useEffect(() => {
    const user = getUser<{ name?: string; email?: string }>();
    if (user?.name) setName(user.name);
    if (user?.email) setEmail(user.email);

    fetchMyDealer().then((d) => {
      if (d?.name) setDealership(d.name);
    });
  }, []);

  /* outside click → close */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* real logout */
  const handleLogout = async () => {
    try {
      await apiPost("/logout", {});
    } catch {
      // ignore
    }
    clearAuth();
    window.location.href = `${FRONTEND_URL}/sign-in`;
  };

  const hasValidAvatar =
    !imgFailed &&
    avatarUrl !== null &&
    avatarUrl.trim() !== "" &&
    avatarUrl !== "null" &&
    avatarUrl !== "undefined";

  const initials = (name || "U").trim().charAt(0).toUpperCase();

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 rounded-xl border border-[#1e2a4a] bg-[#111B33] pl-2 pr-3 py-1.5 hover:border-[#2d3d5e] transition-colors"
      >
        {hasValidAvatar ? (
          <img
            src={avatarUrl!}
            alt="Profile"
            onError={() => setImgFailed(true)}
            className="h-8 w-8 flex-shrink-0 rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#FC5E01] text-white text-xs font-bold">
            {initials}
          </div>
        )}
        <div className="text-left hidden sm:block">
          <p className="text-xs font-bold text-white leading-none">{name}</p>
          <p className="text-[10px] text-[#64748B] mt-0.5">{dealership || "Your Dealership"}</p>
        </div>
        <ChevronDown size={14} className={`text-[#64748B] transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-30 mt-2 w-56 rounded-2xl border border-[#1e2a4a] bg-[#0C1A32] shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 border-b border-[#1e2a4a] px-4 py-3">
            {hasValidAvatar ? (
              <img
                src={avatarUrl!}
                alt="Profile"
                onError={() => setImgFailed(true)}
                className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#FC5E01] text-white text-sm font-bold">
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">{name}</p>
              <p className="text-xs text-[#64748B] truncate">{email}</p>
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
              onClick={handleLogout}
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