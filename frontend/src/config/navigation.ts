// src/config/navigation.ts
export interface NavItem {
  id: number;
  label: string;
  href: string;
}

export interface NavDropdownItem {
  id: number;
  label: string;
  href: string;
}

export interface NavDropdown {
  id: number;
  label: string;
  href?: string;
  dropdown: NavDropdownItem[];
}

export type NavigationItem = NavItem | NavDropdown;

export const navigation: NavigationItem[] = [
  {
    id: 1,
    label: "Solutions",
    dropdown: [
      { id: 11, label: "Vehicle Inventory", href: "/solutions/inventory" },
      { id: 12, label: "CRM & Lead Management", href: "/solutions/crm" },
      { id: 13, label: "AI-Powered Automation", href: "/solutions/ai-automation" },
      { id: 14, label: "Website & Domain Builder", href: "/solutions/website-builder" },
      { id: 15, label: "Marketing & Campaigns", href: "/solutions/marketing" },
      { id: 16, label: "Payments & Checkout", href: "/solutions/payments" },
      { id: 17, label: "Analytics & Reporting", href: "/solutions/analytics" },
      { id: 18, label: "Deal Closing & Sales", href: "/solutions/deal-closing" },
    ],
  },
  {
    id: 2,
    label: "Inventory",
    href: "/inventory",
  },
  {
    id: 3,
    label: "Dealers",
    href: "/dealers",
  },
  {
    id: 4,
    label: "Pricing",
    href: "/pricing",
  },
  {
    id: 5,
    label: "About",
    href: "/about",
  },
  {
    id: 6,
    label: "Contact",
    href: "/contact",
  },
];