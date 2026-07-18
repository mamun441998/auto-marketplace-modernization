import { WebsiteData, WebsiteTheme } from "./types";

/* ===========================================
   Default Theme
=========================================== */

export const defaultTheme: WebsiteTheme = {
  id: "classic-orange",

  name: "Classic Orange",

  primary: "#FC5E01",

  secondary: "#111B33",

  accent: "#F59E0B",

  background: "#0A0F1E",

  surface: "#111B33",

  text: "#FFFFFF",

  mutedText: "#94A3B8",

  mode: "dark",
};

/* ===========================================
   Default Website
=========================================== */

export const defaultWebsiteData: WebsiteData = {
  status: "draft",

  branding: {
    dealershipName: "Anderson Auto",

    logo: "/images/logo.png",

    favicon: "/favicon.ico",

    slogan: "Drive Your Dream Today",
  },

  theme: defaultTheme,

  settings: {
    contactPhone: "+1 (555) 123-4567",

    contactEmail: "info@andersonauto.com",

    address: "New York, USA",

    enableChatWidget: true,

    enableWhatsapp: true,

    enableStickyHeader: true,
  },

  navigation: [
    {
      id: "nav-home",
      label: "Home",
      page: "home",
      enabled: true,
      order: 1,
    },
    {
      id: "nav-inventory",
      label: "Inventory",
      page: "inventory",
      enabled: true,
      order: 2,
    },
    {
      id: "nav-financing",
      label: "Financing",
      page: "financing",
      enabled: true,
      order: 3,
    },
    {
      id: "nav-services",
      label: "Services",
      page: "services",
      enabled: true,
      order: 4,
    },
    {
      id: "nav-about",
      label: "About",
      page: "about",
      enabled: true,
      order: 5,
    },
    {
      id: "nav-contact",
      label: "Contact",
      page: "contact",
      enabled: true,
      order: 6,
    },
  ],

  pages: [
    {
      id: "page-home",
      name: "Home",
      slug: "/",
      type: "home",
      enabled: true,
      sections: [
        "hero",
        "vehicle-search",
        "featured-vehicles",
        "services",
        "finance-banner",
        "testimonials",
        "faq",
      ],
    },
    {
      id: "page-inventory",
      name: "Inventory",
      slug: "/inventory",
      type: "inventory",
      enabled: true,
      sections: [],
    },
    {
      id: "page-financing",
      name: "Financing",
      slug: "/financing",
      type: "financing",
      enabled: true,
      sections: [],
    },
    {
      id: "page-services",
      name: "Services",
      slug: "/services",
      type: "services",
      enabled: true,
      sections: [],
    },
    {
      id: "page-about",
      name: "About",
      slug: "/about",
      type: "about",
      enabled: true,
      sections: [],
    },
    {
      id: "page-contact",
      name: "Contact",
      slug: "/contact",
      type: "contact",
      enabled: true,
      sections: [],
    },
  ],

  sections: [
    {
      id: "hero",
      type: "hero",
      title: "Hero Section",
      enabled: true,
      order: 1,
      settings: {},
    },
    {
      id: "vehicle-search",
      type: "vehicle-search",
      title: "Vehicle Search",
      enabled: true,
      order: 2,
      settings: {},
    },
    {
      id: "featured-vehicles",
      type: "featured-vehicles",
      title: "Featured Vehicles",
      enabled: true,
      order: 3,
      settings: {},
    },
    {
      id: "services",
      type: "services",
      title: "Services",
      enabled: true,
      order: 4,
      settings: {},
    },
    {
      id: "finance-banner",
      type: "finance-banner",
      title: "Finance Banner",
      enabled: true,
      order: 5,
      settings: {},
    },
    {
      id: "testimonials",
      type: "testimonials",
      title: "Testimonials",
      enabled: true,
      order: 6,
      settings: {},
    },
    {
      id: "faq",
      type: "faq",
      title: "FAQ",
      enabled: true,
      order: 7,
      settings: {},
    },
  ],
};