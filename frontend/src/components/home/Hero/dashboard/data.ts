import {
  LayoutDashboard,
  CarFront,
  Users,
  BadgeDollarSign,
  Globe,
  Megaphone,
  BarChart3,
  Settings,
} from "lucide-react";

export type DashboardMenuType =
  | "dashboard"
  | "inventory"
  | "crm"
  | "sales"
  | "website"
  | "marketing"
  | "analytics"
  | "settings";

export interface DashboardMenuItem {
  id: DashboardMenuType;
  label: string;
  icon: any;
}

export const dashboardMenus: DashboardMenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    id: "inventory",
    label: "Inventory",
    icon: CarFront,
  },

  {
    id: "crm",
    label: "CRM",
    icon: Users,
  },

  {
    id: "sales",
    label: "Sales",
    icon: BadgeDollarSign,
  },

  {
    id: "website",
    label: "Website",
    icon: Globe,
  },

  {
    id: "marketing",
    label: "Marketing",
    icon: Megaphone,
  },

  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
  },

  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];