// src/components/home/Everything/everythingData.ts

export interface EverythingItem {
  id: number;
  title: string;
  description: string;
  liveLabel: string;
  liveValue: string;
  iconType: "inventory" | "crm" | "ai" | "website" | "marketing" | "payment" | "analytics" | "deal";
  gradient: string;
  accentColor: string;
  href: string;
}

export const everythingData: EverythingItem[] = [
  {
    id: 1,
    title: "Vehicle Inventory",
    description: "Manage unlimited vehicles with VIN tracking, pricing, stock levels and photo galleries.",
    liveLabel: "LIVE DATA",
    liveValue: "15K+ Vehicles",
    iconType: "inventory",
    gradient: "from-blue-500/10 to-cyan-500/5",
    accentColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    href: "/solutions/inventory",
  },
  {
    id: 2,
    title: "CRM & Lead Management",
    description: "Capture, track and convert every lead from your website, calls and walk-ins in one place.",
    liveLabel: "LIVE DATA",
    liveValue: "238 Active Leads",
    iconType: "crm",
    gradient: "from-emerald-500/10 to-teal-500/5",
    accentColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    href: "/solutions/crm",
  },
  {
    id: 3,
    title: "AI-Powered Automation",
    description: "AI vehicle pricing, auto-generated descriptions and smart deal-closing assistance.",
    liveLabel: "POWERED BY",
    liveValue: "AI Engine",
    iconType: "ai",
    gradient: "from-violet-500/10 to-fuchsia-500/5",
    accentColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    href: "/solutions/ai-automation",
  },
  {
    id: 4,
    title: "Website & Domain Builder",
    description: "Launch your own dealership website and connect a custom domain — no coding required.",
    liveLabel: "LIVE DATA",
    liveValue: "SEO Optimized",
    iconType: "website",
    gradient: "from-indigo-500/10 to-purple-500/5",
    accentColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    href: "/solutions/website-builder",
  },
  {
    id: 5,
    title: "Marketing & Campaigns",
    description: "Run automated campaigns, featured listings and targeted promotions for your dealership.",
    liveLabel: "LIVE DATA",
    liveValue: "Campaign Ready",
    iconType: "marketing",
    gradient: "from-rose-500/10 to-pink-500/5",
    accentColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    href: "/solutions/marketing",
  },
  {
    id: 6,
    title: "Payments & Checkout",
    description: "Accept Visa, Mastercard, PayPal and Stripe payments directly through your dealership platform.",
    liveLabel: "SECURE",
    liveValue: "PCI Compliant",
    iconType: "payment",
    gradient: "from-amber-500/10 to-orange-500/5",
    accentColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    href: "/solutions/payments",
  },
  {
    id: 7,
    title: "Analytics & Reporting",
    description: "Monitor sales, revenue and dealership performance with real-time interactive dashboards.",
    liveLabel: "LIVE DATA",
    liveValue: "+18% Growth",
    iconType: "analytics",
    gradient: "from-cyan-500/10 to-sky-500/5",
    accentColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    href: "/solutions/analytics",
  },
  {
    id: 8,
    title: "Deal Closing & Sales",
    description: "Manage the full sales pipeline from first contact to signed deal and completed payment.",
    liveLabel: "LIVE DATA",
    liveValue: "86 Deals Closed",
    iconType: "deal",
    gradient: "from-green-500/10 to-emerald-500/5",
    accentColor: "text-green-400 bg-green-500/10 border-green-500/20",
    href: "/solutions/deal-closing",
  },
];