"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Car,
  Users,
  Globe,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dealer-admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Inventory",
    href: "/dealer-admin/inventory",
    icon: Car,
  },
  {
    title: "Customers",
    href: "/dealer-admin/customers",
    icon: Users,
  },
  {
    title: "Website Builder",
    href: "/dealer-admin/website-builder",
    icon: Globe,
  },
  {
    title: "Analytics",
    href: "/dealer-admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dealer-admin/settings",
    icon: Settings,
  },
];

export default function DealerSidebar() {
  const pathname = usePathname();

  const {
    user,
    logout,
  } = useAuth();

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-[260px] flex-col border-r border-white/10 bg-[#0F172A]">

      {/* Logo */}

      <div className="border-b border-white/10 px-6 py-6">
        <h2 className="text-2xl font-bold text-white">
          MotoHave
        </h2>

        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-orange-400">
          Dealer Panel
        </p>
      </div>

      {/* User */}

      <div className="border-b border-white/10 px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FC5E01] text-lg font-semibold text-white">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">
              {user?.name}
            </h4>

            <p className="text-xs text-slate-400">
              {user?.email}
            </p>
          </div>

        </div>

      </div>

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto px-4 py-5">

        <nav className="space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  active
                    ? "bg-[#FC5E01] text-white shadow-lg"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />

                {item.title}
              </Link>
            );
          })}

        </nav>

      </div>

      {/* Logout */}

      <div className="border-t border-white/10 p-4">

        <button
          onClick={logout}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-red-500/10
            px-4
            py-3
            text-sm
            font-medium
            text-red-400
            transition
            hover:bg-red-500
            hover:text-white
          "
        >
          <LogOut size={18} />

          Logout
        </button>

      </div>

    </aside>
  );
}