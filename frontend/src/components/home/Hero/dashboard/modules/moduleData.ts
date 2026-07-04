import {
  Users,
  UserPlus,
  Phone,
  Mail,
  Trophy,
  Percent,
  DollarSign,
  TrendingUp,
  Target,
  BadgeDollarSign,
  Globe,
  Eye,
  Activity,
  FileText,
  Megaphone,
  MousePointerClick,
  Clock,
  Settings,
  Bell,
  Shield,
  CreditCard,
  Plug,
} from "lucide-react";
import type { ElementType } from "react";

import type { DashboardMenuType } from "../data";

export type Tone =
  | "blue"
  | "emerald"
  | "amber"
  | "purple"
  | "cyan"
  | "rose"
  | "slate";

export type BadgeTone =
  | "blue"
  | "emerald"
  | "amber"
  | "rose"
  | "slate";

export interface ModuleStat {
  label: string;
  value: string;
  change?: string;
  icon: ElementType;
  tone: Tone;
}

export interface ModuleRow {
  icon?: ElementType;
  iconTone?: Tone;
  title: string;
  subtitle?: string;
  value?: string;
  badge?: string;
  badgeTone?: BadgeTone;
}

export interface ModulePageData {
  title: string;
  subtitle: string;
  action?: string;
  stats?: ModuleStat[];
  listTitle: string;
  listSubtitle?: string;
  rows: ModuleRow[];
}

/**
 * Demo content for every sidebar module that isn't the custom
 * "dashboard" / "inventory" page. Keyed by the sidebar menu id.
 */
export const modulePages: Partial<
  Record<DashboardMenuType, ModulePageData>
> = {
  /* ------------------------------- CRM ------------------------------- */

  crm: {
    title: "Customer Relationship",
    subtitle: "Track leads and customer interactions",
    action: "Add Lead",
    stats: [
      { label: "Total Leads", value: "1,284", change: "+42 this week", icon: Users, tone: "blue" },
      { label: "Active", value: "328", change: "26% of total", icon: Activity, tone: "cyan" },
      { label: "Won", value: "186", change: "+18%", icon: Trophy, tone: "emerald" },
      { label: "Conversion", value: "24%", change: "+3%", icon: Percent, tone: "purple" },
    ],
    listTitle: "Recent Leads",
    listSubtitle: "Latest customer activity",
    rows: [
      { icon: UserPlus, iconTone: "blue", title: "Michael Chen", subtitle: "BMW X5 · Hot lead", value: "$54,900", badge: "New", badgeTone: "blue" },
      { icon: Phone, iconTone: "amber", title: "Sarah Johnson", subtitle: "Follow-up call scheduled", value: "$32,100", badge: "Contacted", badgeTone: "amber" },
      { icon: Users, iconTone: "purple", title: "David Miller", subtitle: "Tesla Model Y", value: "$48,500", badge: "Qualified", badgeTone: "emerald" },
      { icon: Mail, iconTone: "cyan", title: "Emma Wilson", subtitle: "Email inquiry", value: "$27,900", badge: "New", badgeTone: "blue" },
      { icon: Users, iconTone: "slate", title: "James Brown", subtitle: "Audi Q7 · Negotiation", value: "$69,400", badge: "Won", badgeTone: "emerald" },
    ],
  },

  /* ------------------------------ Sales ------------------------------ */

  sales: {
    title: "Sales Pipeline",
    subtitle: "Monitor deals and revenue",
    action: "New Deal",
    stats: [
      { label: "Revenue MTD", value: "$842K", change: "+18%", icon: DollarSign, tone: "blue" },
      { label: "Deals Closed", value: "64", change: "+12", icon: BadgeDollarSign, tone: "emerald" },
      { label: "Avg Deal", value: "$41.2K", change: "+4%", icon: TrendingUp, tone: "cyan" },
      { label: "Target", value: "86%", change: "On track", icon: Target, tone: "purple" },
    ],
    listTitle: "Recent Deals",
    listSubtitle: "This month's closings",
    rows: [
      { icon: BadgeDollarSign, iconTone: "emerald", title: "Robert Fox", subtitle: "Mercedes GLC", value: "$61,200", badge: "Closed", badgeTone: "emerald" },
      { icon: BadgeDollarSign, iconTone: "emerald", title: "Jane Cooper", subtitle: "BMW X5", value: "$54,900", badge: "Closed", badgeTone: "emerald" },
      { icon: Clock, iconTone: "amber", title: "Wade Warren", subtitle: "Tesla Model Y", value: "$48,500", badge: "Pending", badgeTone: "amber" },
      { icon: BadgeDollarSign, iconTone: "emerald", title: "Kristin Watson", subtitle: "Audi Q7", value: "$69,400", badge: "Closed", badgeTone: "emerald" },
      { icon: Clock, iconTone: "amber", title: "Cody Fisher", subtitle: "Toyota Camry", value: "$28,300", badge: "Pending", badgeTone: "amber" },
    ],
  },

  /* ----------------------------- Website ----------------------------- */

  website: {
    title: "Website Performance",
    subtitle: "Your dealership site at a glance",
    action: "Visit Site",
    stats: [
      { label: "Visitors", value: "18.4K", change: "+9%", icon: Users, tone: "blue" },
      { label: "Page Views", value: "62.1K", change: "+11%", icon: Eye, tone: "cyan" },
      { label: "Leads", value: "412", change: "+24", icon: UserPlus, tone: "emerald" },
      { label: "Bounce", value: "38%", change: "-2%", icon: Activity, tone: "amber" },
    ],
    listTitle: "Top Pages",
    listSubtitle: "Most visited this week",
    rows: [
      { icon: Globe, iconTone: "blue", title: "Homepage", subtitle: "/", value: "12,480", badge: "+8%", badgeTone: "emerald" },
      { icon: FileText, iconTone: "cyan", title: "Inventory", subtitle: "/inventory", value: "9,210", badge: "+12%", badgeTone: "emerald" },
      { icon: FileText, iconTone: "purple", title: "Vehicle Details", subtitle: "/vehicles", value: "6,540", badge: "+5%", badgeTone: "emerald" },
      { icon: FileText, iconTone: "amber", title: "Financing", subtitle: "/financing", value: "3,120", badge: "-2%", badgeTone: "rose" },
      { icon: FileText, iconTone: "slate", title: "Contact", subtitle: "/contact", value: "2,050", badge: "+3%", badgeTone: "emerald" },
    ],
  },

  /* ---------------------------- Marketing ---------------------------- */

  marketing: {
    title: "Marketing Campaigns",
    subtitle: "Manage ads and outreach",
    action: "New Campaign",
    stats: [
      { label: "Campaigns", value: "12", change: "3 launching", icon: Megaphone, tone: "blue" },
      { label: "Impressions", value: "1.2M", change: "+21%", icon: Eye, tone: "cyan" },
      { label: "Clicks", value: "48.6K", change: "+14%", icon: MousePointerClick, tone: "emerald" },
      { label: "CTR", value: "4.1%", change: "+0.4%", icon: Percent, tone: "purple" },
    ],
    listTitle: "Active Campaigns",
    listSubtitle: "Live and scheduled",
    rows: [
      { icon: Megaphone, iconTone: "blue", title: "Summer Sale 2025", subtitle: "Google Ads", value: "$8,400", badge: "Active", badgeTone: "emerald" },
      { icon: Megaphone, iconTone: "cyan", title: "Trade-In Event", subtitle: "Facebook", value: "$5,200", badge: "Active", badgeTone: "emerald" },
      { icon: Megaphone, iconTone: "amber", title: "EV Awareness", subtitle: "Instagram", value: "$3,900", badge: "Paused", badgeTone: "amber" },
      { icon: Mail, iconTone: "emerald", title: "Email Newsletter", subtitle: "Email · 24K subscribers", value: "$1,200", badge: "Active", badgeTone: "emerald" },
      { icon: Megaphone, iconTone: "purple", title: "Retargeting", subtitle: "Google Ads", value: "$2,750", badge: "Active", badgeTone: "emerald" },
    ],
  },

  /* ---------------------------- Analytics ---------------------------- */

  analytics: {
    title: "Analytics Overview",
    subtitle: "Insights across your dealership",
    action: "Export",
    stats: [
      { label: "Sessions", value: "24.8K", change: "+11%", icon: Activity, tone: "blue" },
      { label: "Conversion", value: "3.8%", change: "+0.5%", icon: Target, tone: "emerald" },
      { label: "Avg Time", value: "4m 12s", change: "+18s", icon: Clock, tone: "amber" },
      { label: "Revenue", value: "$1.24M", change: "+18%", icon: DollarSign, tone: "purple" },
    ],
    listTitle: "Traffic Sources",
    listSubtitle: "Where visitors come from",
    rows: [
      { icon: Globe, iconTone: "blue", title: "Organic Search", subtitle: "42% of traffic", value: "10,416", badge: "+9%", badgeTone: "emerald" },
      { icon: MousePointerClick, iconTone: "cyan", title: "Direct", subtitle: "24% of traffic", value: "5,952", badge: "+4%", badgeTone: "emerald" },
      { icon: Megaphone, iconTone: "purple", title: "Paid Ads", subtitle: "18% of traffic", value: "4,464", badge: "+15%", badgeTone: "emerald" },
      { icon: Users, iconTone: "amber", title: "Social", subtitle: "11% of traffic", value: "2,728", badge: "-3%", badgeTone: "rose" },
      { icon: FileText, iconTone: "slate", title: "Referral", subtitle: "5% of traffic", value: "1,240", badge: "+2%", badgeTone: "emerald" },
    ],
  },

  /* ----------------------------- Settings ---------------------------- */

  settings: {
    title: "Settings",
    subtitle: "Manage your account and preferences",
    listTitle: "Preferences",
    listSubtitle: "Account & workspace configuration",
    rows: [
      { icon: Users, iconTone: "blue", title: "Profile", subtitle: "Update your dealership info", badge: "Edit", badgeTone: "blue" },
      { icon: Bell, iconTone: "amber", title: "Notifications", subtitle: "Email & push alerts", badge: "On", badgeTone: "emerald" },
      { icon: CreditCard, iconTone: "emerald", title: "Billing", subtitle: "Plan: Professional", badge: "Active", badgeTone: "emerald" },
      { icon: Plug, iconTone: "cyan", title: "Integrations", subtitle: "6 connected apps", badge: "6", badgeTone: "slate" },
      { icon: Shield, iconTone: "purple", title: "Security", subtitle: "Two-factor authentication", badge: "Secure", badgeTone: "emerald" },
      { icon: Settings, iconTone: "slate", title: "Workspace", subtitle: "Team & permissions", badge: "Manage", badgeTone: "blue" },
    ],
  },
};
