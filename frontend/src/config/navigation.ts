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
      {
        id: 101,
        label: "Vehicle Inventory",
        href: "/solutions/inventory",
      },
      {
        id: 102,
        label: "CRM & Lead Management",
        href: "/solutions/crm",
      },
      {
        id: 103,
        label: "AI Automation",
        href: "/solutions/ai-automation",
      },
      {
        id: 104,
        label: "Website Builder",
        href: "/solutions/website-builder",
      },
      {
        id: 105,
        label: "Marketing Suite",
        href: "/solutions/marketing",
      },
      {
        id: 106,
        label: "Payments",
        href: "/solutions/payments",
      },
      {
        id: 107,
        label: "Analytics & Reports",
        href: "/solutions/analytics",
      },
      {
        id: 108,
        label: "Sales & Deal Closing",
        href: "/solutions/deal-closing",
      },
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
    label: "Case Studies",
    href: "/case-studies",
  },

  {
    id: 6,
    label: "About",
    href: "/about",
  },

  {
    id: 7,
    label: "Contact",
    href: "/contact",
  },
];