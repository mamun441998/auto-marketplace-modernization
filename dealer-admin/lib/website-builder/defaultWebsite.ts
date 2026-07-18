import { WebsiteSchema } from "./schema";

export const defaultWebsite: WebsiteSchema = {
  branding: {
    dealershipName: "Anderson Auto",

    tagline: "Trusted Cars. Honest Prices.",

    logo: "",

    favicon: "",

    primaryColor: "#FC5E01",

    secondaryColor: "#111B33",

    accentColor: "#2563EB",

    fontFamily: "Inter",
  },

  header: {
    transparent: false,

    sticky: true,

    showPhone: true,

    showEmail: true,

    showLogin: true,

    showWishlist: true,

    showCompare: true,
  },

  footer: {
    copyright:
      "© 2026 Anderson Auto. All rights reserved.",

    showNewsletter: true,

    showSocialLinks: true,
  },

  contact: {
    phone: "+1 (555) 123-4567",

    email: "info@andersonauto.com",

    address: "New York, USA",

    whatsapp: "",

    googleMap: "",
  },

  seo: {
    metaTitle: "",

    metaDescription: "",

    keywords: "",

    ogImage: "",

    favicon: "",
  },

  social: {
    facebook: "",

    instagram: "",

    youtube: "",

    linkedin: "",

    tiktok: "",

    x: "",
  },

  analytics: {
    googleAnalytics: "",

    googleTagManager: "",

    metaPixel: "",
  },

  chat: {
    enabled: true,

    provider: "custom",

    script: "",
  },

  domain: {
    customDomain: "",

    sslEnabled: false,

    live: false,
  },

  pages: {
    home: [
      {
        id: "hero",

        type: "hero",

        title: "Hero Banner",

        enabled: true,

        order: 1,
      },
      {
        id: "search",

        type: "inventory-search",

        title: "Inventory Search",

        enabled: true,

        order: 2,
      },
      {
        id: "featured",

        type: "featured-vehicles",

        title: "Featured Vehicles",

        enabled: true,

        order: 3,
      },
      {
        id: "why-us",

        type: "why-us",

        title: "Why Choose Us",

        enabled: true,

        order: 4,
      },
      {
        id: "financing",

        type: "financing",

        title: "Financing Banner",

        enabled: true,

        order: 5,
      },
      {
        id: "testimonials",

        type: "testimonials",

        title: "Testimonials",

        enabled: true,

        order: 6,
      },
      {
        id: "blogs",

        type: "blogs",

        title: "Latest Blogs",

        enabled: true,

        order: 7,
      },
      {
        id: "faq",

        type: "faq",

        title: "FAQ",

        enabled: true,

        order: 8,
      },
      {
        id: "cta",

        type: "cta",

        title: "Call To Action",

        enabled: true,

        order: 9,
      },
    ],

    inventory: [],

    "vehicle-details": [],

    about: [],

    financing: [],

    contact: [],

    blog: [],
  },
};