"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CarFront,
  Users,
  MessageSquare,
  Globe,
  Megaphone,
  Sparkles,
  CreditCard,
  BarChart3,
  UserCog,
  Settings,
  Lock,
  LogOut,
  LifeBuoy,
  Wallet,
} from "lucide-react";
import PlanBadge from "./PlanBadge";
import { getCurrentDealerPlan } from "@/lib/planConfig";

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  featureKey?: keyof ReturnType<typeof getCurrentDealerPlan>["features"];
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Inventory", href: "/inventory", icon: CarFront },
  { label: "Leads & CRM", href: "/leads", icon: Users },
  { label: "Live Inbox", href: "/inbox", icon: MessageSquare },
  { label: "Website Builder", href: "/website-builder", icon: Globe, featureKey: "websiteBuilder" },
  { label: "Marketing", href: "/marketing", icon: Megaphone, featureKey: "marketingCampaigns" },
  { label: "AI Tools", href: "/ai-tools", icon: Sparkles, featureKey: "aiPricing" },
  { label: "Payments", href: "/payments", icon: CreditCard },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Team", href: "/team", icon: UserCog },
  { label: "Support", href: "/support", icon: LifeBuoy },
  { label: "Billing", href: "/billing", icon: Wallet },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function DealerSidebar() {
  const pathname = usePathname();
  const currentPlan = getCurrentDealerPlan();

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

      {/* Plan Badge */}
      <div className="px-4 pt-4">
        <PlanBadge />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const isLocked = item.featureKey ? !currentPlan.features[item.featureKey] : false;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#FC5E01] text-white shadow-sm"
                  : "text-[#94A3B8] hover:bg-[#111B33] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} />
                {item.label}
              </div>
              {isLocked && (
                <Lock size={13} className={isActive ? "text-white/70" : "text-[#64748B]"} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-[#1e2a4a] p-3">
        <button className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#94A3B8] hover:bg-[#111B33] hover:text-rose-400 transition-colors">
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  );
}