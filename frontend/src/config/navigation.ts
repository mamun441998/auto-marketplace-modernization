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
      { id: 11, label: "Automotive CRM", href: "/solutions/crm" },
      { id: 12, label: "Vehicle Inventory", href: "/solutions/inventory" },
      { id: 13, label: "AI Vehicle Pricing", href: "/solutions/ai-pricing" },
      { id: 14, label: "Lead Management", href: "/solutions/leads" },
      { id: 15, label: "Digital Inspection", href: "/solutions/inspection" },
      { id: 16, label: "Dealership Management", href: "/solutions/dealership" },
      { id: 17, label: "Auto Auction System", href: "/solutions/auction" },
      { id: 18, label: "Automotive ERP", href: "/solutions/erp" },
      { id: 19, label: "Analytics & Reporting", href: "/solutions/analytics" },
      { id: 20, label: "Paperless Dealership", href: "/solutions/paperless" },
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