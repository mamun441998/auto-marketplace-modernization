export interface BrandingSettings {
  dealershipName: string;
  tagline: string;

  logo: string;
  favicon: string;

  primaryColor: string;
  secondaryColor: string;
  accentColor: string;

  fontFamily: string;
  borderRadius: "sm" | "md" | "lg" | "xl";

  phone: string;
  email: string;
  website: string;

  address: string;

  facebook: string;
  instagram: string;
 youtube: string;
  linkedin: string;
  tiktok: string;

  whatsapp: string;

  googleMaps: string;

  timezone: string;
  language: string;
  currency: string;
}

export const defaultBranding: BrandingSettings = {
  dealershipName: "Anderson Auto",

  tagline: "Trusted Cars. Honest Prices.",

  logo: "",

  favicon: "",

  primaryColor: "#FC5E01",

  secondaryColor: "#111B33",

  accentColor: "#F59E0B",

  fontFamily: "Inter",

  borderRadius: "lg",

  phone: "+1 (555) 123-4567",

  email: "info@andersonauto.com",

  website: "https://andersonauto.com",

  address: "123 Main Street, New York",

  facebook: "",

  instagram: "",

  youtube: "",

  linkedin: "",

  tiktok: "",

  whatsapp: "",

  googleMaps: "",

  timezone: "America/New_York",

  language: "English",

  currency: "USD",
};