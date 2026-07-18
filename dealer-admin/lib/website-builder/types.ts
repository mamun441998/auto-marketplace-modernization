import {
  PREVIEW_DEVICES,
  SECTION_TYPES,
  THEME_MODES,
  WEBSITE_PAGES,
  WEBSITE_STATUS,
} from "./constants";

/* ===========================================
   Basic Types
=========================================== */

export type WebsiteStatus = (typeof WEBSITE_STATUS)[number];

export type WebsitePageType = (typeof WEBSITE_PAGES)[number];

export type SectionType = (typeof SECTION_TYPES)[number];

export type ThemeMode = (typeof THEME_MODES)[number];

export type PreviewDevice = (typeof PREVIEW_DEVICES)[number];

/* ===========================================
   Branding
=========================================== */

export interface WebsiteBranding {
  dealershipName: string;
  logo: string;
  favicon: string;
  slogan: string;
}

/* ===========================================
   Theme
=========================================== */

export interface WebsiteTheme {
  id: string;
  name: string;

  primary: string;
  secondary: string;
  accent: string;

  background: string;
  surface: string;

  text: string;
  mutedText: string;

  mode: ThemeMode;
}

/* ===========================================
   Navigation
=========================================== */

export interface NavigationItem {
  id: string;

  label: string;

  page: WebsitePageType;

  enabled: boolean;

  order: number;
}

/* ===========================================
   Website Page
=========================================== */

export interface WebsitePage {

  id: string;

  name: string;

  slug: string;

  type: WebsitePageType;

  enabled: boolean;

  sections: string[];
}

/* ===========================================
   Website Section
=========================================== */

export interface WebsiteSection {

  id: string;

  type: SectionType;

  title: string;

  enabled: boolean;

  order: number;

  settings: Record<string, unknown>;
}

/* ===========================================
   Website Settings
=========================================== */

export interface WebsiteSettings {

  contactPhone: string;

  contactEmail: string;

  address: string;

  enableChatWidget: boolean;

  enableWhatsapp: boolean;

  enableStickyHeader: boolean;
}

/* ===========================================
   Root Website Object
=========================================== */

export interface WebsiteData {

  status: WebsiteStatus;

  branding: WebsiteBranding;

  theme: WebsiteTheme;

  settings: WebsiteSettings;

  navigation: NavigationItem[];

  pages: WebsitePage[];

  sections: WebsiteSection[];
}