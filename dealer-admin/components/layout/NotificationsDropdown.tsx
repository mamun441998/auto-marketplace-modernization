"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Bell, UserPlus, DollarSign, CarFront, Users, Info, Check, X, ArrowRight } from "lucide-react";
import { notifications as initialNotifications, Notification } from "@/lib/dealerData";

const typeConfig: Record<Notification["type"], { icon: typeof Bell; color: string; href: string; label: string }> = {
  lead: { icon: UserPlus, color: "text-blue-400 bg-blue-500/10", href: "/leads", label: "View Leads" },
  payment: { icon: DollarSign, color: "text-emerald-400 bg-emerald-500/10", href: "/payments", label: "View Payments" },
  inventory: { icon: CarFront, color: "text-amber-400 bg-amber-500/10", href: "/inventory", label: "View Inventory" },
  team: { icon: Users, color: "text-violet-400 bg-violet-500/10", href: "/team", label: "View Team" },
  system: { icon: Info, color: "text-[#94A3B8] bg-[#1e2a4a]", href: "/analytics", label: "View Analytics" },
};

function timeAgo(timestamp: string): string {
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export default function NotificationsDropdown() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifications);
  const [selectedNotif, setSelectedNotif] = useState<Notification | null>(null);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifs.filter((n) => !n.read).length;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const openNotification = (notif: Notification) => {
    setNotifs((prev) => prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n)));
    setSelectedNotif(notif);
    setIsOpen(false);
  };

  const goToRelatedPage = () => {
    if (!selectedNotif) return;
    router.push(typeConfig[selectedNotif.type].href);
    setSelectedNotif(null);
  };

  const modalContent = selectedNotif ? (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={() => setSelectedNotif(null)} />

      <div className="relative w-full max-w-md rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6 shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${typeConfig[selectedNotif.type].color}`}>
            {(() => {
              const Icon = typeConfig[selectedNotif.type].icon;
              return <Icon size={20} />;
            })()}
          </div>
          <button onClick={() => setSelectedNotif(null)} className="text-[#94A3B8] hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <h3 className="text-base font-bold text-white mb-1.5">{selectedNotif.title}</h3>
        <p className="text-sm text-[#94A3B8] leading-relaxed mb-2">{selectedNotif.message}</p>
        <p className="text-xs text-[#64748B] mb-6">{timeAgo(selectedNotif.timestamp)}</p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedNotif(null)}
            className="flex-1 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-2.5 text-sm font-semibold text-white hover:border-[#2d3d5e] transition-colors"
          >
            Close
          </button>
          <button
            onClick={goToRelatedPage}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#FC5E01] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors"
          >
            {typeConfig[selectedNotif.type].label}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className="relative" ref={containerRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#1e2a4a] bg-[#111B33] text-[#94A3B8] hover:text-white transition-colors"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FC5E01] text-[9px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full z-30 mt-2 w-80 sm:w-96 rounded-2xl border border-[#1e2a4a] bg-[#0C1A32] shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#1e2a4a] px-4 py-3">
              <h3 className="text-sm font-bold text-white">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-1 text-xs font-semibold text-[#FC5E01] hover:text-[#E5540A] transition-colors"
                >
                  <Check size={13} />
                  Mark all as read
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifs.length > 0 ? (
                notifs.map((notif) => {
                  const config = typeConfig[notif.type];
                  const Icon = config.icon;

                  return (
                    <button
                      key={notif.id}
                      onClick={() => openNotification(notif)}
                      className={`flex w-full items-start gap-3 border-b border-[#1e2a4a] last:border-0 px-4 py-3 text-left transition-colors hover:bg-[#111B33] ${
                        !notif.read ? "bg-[#111B33]/50" : ""
                      }`}
                    >
                      <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${config.color}`}>
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-semibold text-white truncate">{notif.title}</p>
                          {!notif.read && <span className="h-1.5 w-1.5 rounded-full bg-[#FC5E01] flex-shrink-0" />}
                        </div>
                        <p className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed line-clamp-1">{notif.message}</p>
                        <p className="text-[10px] text-[#64748B] mt-1">{timeAgo(notif.timestamp)}</p>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-10 text-center text-sm text-[#64748B]">No notifications yet.</div>
              )}
            </div>
          </div>
        )}
      </div>

      {mounted && modalContent ? createPortal(modalContent, document.body) : null}
    </>
  );
}