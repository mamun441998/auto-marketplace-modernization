"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Users,
  FileText,
  LifeBuoy,
  BarChart3,
  Settings,
  Globe,
  ShieldAlert,
  LogOut,
} from "lucide-react";
import { adminLogout } from "@/lib/adminAuth";
import { useAdminUser } from "@/lib/adminAuthContext";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Dealers", href: "/dealers", icon: Building2 },
  { label: "Billing & Plans", href: "/billing", icon: CreditCard, superOnly: true },
  { label: "Users & Roles", href: "/users", icon: Users, superOnly: true },
  { label: "Content", href: "/content", icon: FileText },
  { label: "Support Tickets", href: "/support", icon: LifeBuoy },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Domains", href: "/domains", icon: Globe },
  { label: "Security Logs", href: "/security", icon: ShieldAlert, superOnly: true },
  { label: "Settings", href: "/settings", icon: Settings, superOnly: true },
];

export default function SuperAdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const me = useAdminUser();
  const isSuper = me?.role === "super_admin";

  const items = navItems.filter((item) => !item.superOnly || isSuper);

  async function handleLogout() {
    await adminLogout();
    router.replace("/login");
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] border-r border-[#1e2a4a] bg-[#0C1A32] flex flex-col z-30">
      <div className="flex items-center justify-center px-4 py-1.5 border-b border-[#1e2a4a]">
        <Link href="/" className="flex items-center justify-center w-full">
          <div className="relative h-16 w-[220px]">
            <Image
              src="/main-brand-logo.png"
              alt="MotoHave Logo"
              fill
              sizes="(max-width: 768px) 150px, 200px"
              className="object-contain object-center"
              priority
            />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#FC5E01] text-white shadow-sm"
                  : "text-[#94A3B8] hover:bg-[#111B33] hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-[#1e2a4a] p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#94A3B8] hover:bg-[#111B33] hover:text-rose-400 transition-colors"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  );
}