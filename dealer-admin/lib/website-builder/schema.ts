// =========================
// MotoHave Website Builder
// Production Schema
// =========================

export type WebsitePage =
  | "home"
  | "inventory"
  | "vehicle-details"
  | "about"
  | "financing"
  | "contact"
  | "blog";

export interface WebsiteSection {
  id: string;
  type: string;
  title: string;
  enabled: boolean;
  order: number;
}

export interface BrandingSettings {
  dealershipName: string;
  tagline: string;

  logo: string;
  favicon: string;

  primaryColor: string;
  secondaryColor: string;
  accentColor: string;

  fontFamily: string;
}

export interface HeaderSettings {
  transparent: boolean;
  sticky: boolean;
  showPhone: boolean;
  showEmail: boolean;
  showLogin: boolean;
  showWishlist: boolean;
  showCompare: boolean;
}

export interface FooterSettings {
  copyright: string;

  showNewsletter: boolean;

  showSocialLinks: boolean;
}

export interface ContactSettings {
  phone: string;

  email: string;

  address: string;

  whatsapp: string;

  googleMap: string;
}

export interface SeoSettings {
  metaTitle: string;

  metaDescription: string;

  keywords: string;

  ogImage: string;

  favicon: string;
}

export interface SocialSettings {
  facebook: string;

  instagram: string;

  youtube: string;

  linkedin: string;

  tiktok: string;

  x: string;
}

export interface AnalyticsSettings {
  googleAnalytics: string;

  googleTagManager: string;

  metaPixel: string;
}

export interface ChatSettings {
  enabled: boolean;

  provider: string;

  script: string;
}

export interface DomainSettings {
  customDomain: string;

  sslEnabled: boolean;

  live: boolean;
}

export interface WebsiteSchema {
  branding: BrandingSettings;

  header: HeaderSettings;

  footer: FooterSettings;

  contact: ContactSettings;

  seo: SeoSettings;

  social: SocialSettings;

  analytics: AnalyticsSettings;

  chat: ChatSettings;

  domain: DomainSettings;

  pages: Record<WebsitePage, WebsiteSection[]>;
}