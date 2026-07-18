// lib/websiteData.ts

import {
  BrandingSettings,
  defaultBranding,
} from "./website-builder/branding";

export const websiteThemes = [
  { id: "orange", name: "Dealership Orange", primary: "#FC5E01", secondary: "#111B33" },
  { id: "blue", name: "Electric Blue", primary: "#2563EB", secondary: "#0F172A" },
  { id: "emerald", name: "Emerald", primary: "#10B981", secondary: "#0F172A" },
  { id: "purple", name: "Luxury Purple", primary: "#8B5CF6", secondary: "#0F172A" },
] as const;

export type WebsiteTheme = (typeof websiteThemes)[number];

export type WebsitePage = "home" | "inventory" | "about" | "financing" | "contact";

export interface HomePageData {
  heroTitle: string;
  heroSubtitle: string;
  featuredCount: number;
  showFinancing: boolean;
}

export interface InventoryPageData {
  title: string;
  subtitle: string;
  enabled: boolean;
}

export interface AboutPageData {
  title: string;
  subtitle: string;
  story: string;
}

export interface FinancingPageData {
  title: string;
  subtitle: string;
  enabled: boolean;
}

export interface ContactPageData {
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  address: string;
}

export interface WebsiteSettings {
  theme: WebsiteTheme;
  contactPhone: string;
  enableChatWidget: boolean;
}

export interface WebsiteData {
  settings: WebsiteSettings;
  home: HomePageData;
  inventory: InventoryPageData;
  about: AboutPageData;
  financing: FinancingPageData;
  contact: ContactPageData;
  branding: BrandingSettings;
}

export const defaultWebsiteData: WebsiteData = {
  branding: defaultBranding,
  settings: {
    theme: websiteThemes[0],
    contactPhone: "+1 (555) 123-4567",
    enableChatWidget: true,
    
  },

  home: {
    heroTitle: "Find Your Dream Vehicle Today",
    heroSubtitle:
      "Explore our premium collection of certified pre-owned and new vehicles at unmatched competitive rates.",
    featuredCount: 3,
    showFinancing: true,
  },

  inventory: {
    title: "Our Inventory",
    subtitle: "Browse our full selection of quality vehicles, updated in real time.",
    enabled: true,
  },

  about: {
    title: "About Our Dealership",
    subtitle: "Serving customers with trusted vehicles and exceptional service.",
    story:
      "Our dealership has helped thousands of customers find the right vehicle through honesty, transparency, and competitive pricing.",
  },

  financing: {
    title: "Flexible Financing Solutions",
    subtitle: "Fast approvals with competitive financing options for every customer.",
    enabled: true,
  },

  contact: {
    title: "Contact Us",
    subtitle: "Our team is ready to help you find your next vehicle.",
    phone: "+1 (555) 123-4567",
    email: "info@dealership.com",
    address: "123 Main Street, New York, NY",
  },
};