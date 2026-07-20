import { ProductModule } from "../types";

export const modules: ProductModule[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    subtitle: "Dealership Overview",
    description:
      "Monitor your dealership performance with real-time analytics, KPIs, inventory status and business insights from one central dashboard.",
    orbitAngle: -90,
    accent: "#FC5E01",
  },

  {
    id: "inventory",
    title: "Inventory",
    subtitle: "Vehicle Management",
    description:
      "Manage new and used vehicles, pricing, specifications, media, availability and publishing from a powerful inventory system.",
    orbitAngle: -18,
    accent: "#FC5E01",
  },

  {
    id: "crm",
    title: "Lead CRM",
    subtitle: "Customer Pipeline",
    description:
      "Track every customer inquiry, follow-up automatically and convert more leads into successful vehicle sales.",
    orbitAngle: 34,
    accent: "#FC5E01",
  },

  {
    id: "website",
    title: "Website",
    subtitle: "Dealer Website",
    description:
      "Launch your own branded dealership website with inventory sync, SEO optimization and mobile-first performance.",
    orbitAngle: 145,
    accent: "#FC5E01",
  },

  {
    id: "analytics",
    title: "Analytics",
    subtitle: "Data Insights",
    description:
      "Track dealership performance, customer behavior, and inventory trends with real-time analytics.",
    // Place Analytics upper-left to match design
    orbitAngle: -160,
    accent: "#FC5E01",
  },
];