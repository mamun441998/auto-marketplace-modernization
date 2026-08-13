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

/* ---- Flexible content sections ---- */
export type SectionType =
  | "text-image"
  | "reviews"
  | "cta"
  | "gallery"
  | "faq"
  | "stats"
  | "team"
  | "video"
  | "brands"
  | "banner";
  
  export type SectionAnimation = "none" | "fade" | "slide-up" | "zoom";

export interface ReviewItem {
  name: string;
  rating: number; // 1–5
  text: string;
}

export interface WebsiteSection {
  id: string;
  type: SectionType;
  enabled: boolean;
  animation: SectionAnimation;

  // text-image + cta + banner
  heading?: string;
  body?: string;
  buttonText?: string;
  buttonLink?: string;

  // text-image
  image?: string;
  imageSide?: "left" | "right";

  // cta + banner
  background?: "primary" | "dark" | "light";

  // reviews
  reviews?: ReviewItem[];

  // gallery + brands (array of image URLs)
  images?: string[];

  // faq
  faqs?: { q: string; a: string }[];

  // stats / counters
  stats?: { value: string; label: string }[];

  // team
  team?: { name: string; role: string; image?: string }[];

  // video (YouTube URL)
  videoUrl?: string;
}

export interface HomePageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;            // hero background image URL
  featuredCount: number;
  featuredVehicleIds: number[]; // specific vehicles to feature (empty = auto by count)
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
  hours?: string;
}

export interface SeoSettings {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
}

export interface WebsiteSettings {
  theme: WebsiteTheme;
  contactPhone: string;
  enableChatWidget: boolean;

  // Custom colors (override theme). Empty = use default/theme.
  headerBg?: string;   // header background
  ctaColor?: string;   // CTA / button / accent color
  textColor?: string;  // header text color

  // Feature toggles (undefined = on by default)
  showMap?: boolean;          // Google map on contact section
  showFinanceCalc?: boolean;  // finance calculator on vehicle page
    financeApr?: number;        // default interest rate % for calculator

  announcement?: string;      // top announcement bar text
  announcementLink?: string;  // optional link
}

export interface WebsiteData {
  settings: WebsiteSettings;
  home: HomePageData;
  inventory: InventoryPageData;
  about: AboutPageData;
  financing: FinancingPageData;
  contact: ContactPageData;
  branding: BrandingSettings;
  sections: WebsiteSection[];
  seo?: SeoSettings;
}

export const defaultWebsiteData: WebsiteData = {
  branding: defaultBranding,
  sections: [],
  seo: {},
  settings: {
    theme: websiteThemes[0],
    contactPhone: "+1 (555) 123-4567",
    enableChatWidget: true,
    
  },

    home: {
    heroTitle: "Find Your Dream Vehicle Today",
    heroSubtitle:
      "Explore our premium collection of certified pre-owned and new vehicles at unmatched competitive rates.",
    heroImage: "",
    featuredCount: 3,
    featuredVehicleIds: [],
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
    hours: "Mon–Sat: 9am–7pm",
    
  },
};