export interface FeatureItem {
  readonly id: number;
  readonly badge: string;
  readonly title: string;
  readonly description: string;
  readonly highlightText: string;
  readonly image: string;
  readonly accent: string;
  readonly background: string;
  readonly linkHref?: string;
  readonly linkText?: string;
}

export const featuresData: readonly FeatureItem[] = [
  {
    id: 1,
    badge: "AI MARKETING",
    title: "AI-Powered Automotive Marketing",
    description:
      "Launch and optimize Facebook, Instagram and Google campaigns automatically with AI.",
    highlightText: "3× Higher Lead Conversion",
    image: "/images/features/1-Overview.png",
    accent: "#FC5E01",
    background:
      "bg-[radial-gradient(circle_at_center,rgba(252,94,1,.18)_0%,transparent_70%)]",
  },
  {
    id: 2,
    badge: "LIVE ANALYTICS",
    title: "Real-Time Business Analytics",
    description:
      "Track revenue, inventory, customer engagement and dealership performance from one dashboard.",
    highlightText: "Everything In One Dashboard",
    image: "/images/features/5-Analytics.png",
    accent: "#2563EB",
    background:
      "bg-[radial-gradient(circle_at_center,rgba(37,99,235,.18)_0%,transparent_70%)]",
  },
  {
    id: 3,
    badge: "SMART INVENTORY",
    title: "Smart Inventory Management",
    description:
      "Manage inventory, pricing and vehicle availability with intelligent automation.",
    highlightText: "90% Faster Inventory Updates",
    image: "/images/features/2-Inventory.png",
    accent: "#8B5CF6",
    background:
      "bg-[radial-gradient(circle_at_center,rgba(139,92,246,.18)_0%,transparent_70%)]",
  },
  {
    id: 4,
    badge: "WEBSITE BUILDER",
    title: "No-Code Dealership Website Builder",
    description:
      "Design, customize and publish a professional dealership website with drag-and-drop tools.",
    highlightText: "Launch In Minutes",
    image: "/images/features/4-Website.png",
    accent: "#06B6D4",
    background:
      "bg-[radial-gradient(circle_at_center,rgba(6,182,212,.18)_0%,transparent_70%)]",
  },
  {
    id: 5,
    badge: "CRM AUTOMATION",
    title: "AI CRM & Lead Management",
    description:
      "Convert more buyers using automated follow-ups, lead scoring and intelligent sales workflows.",
    highlightText: "Never Lose A Lead",
    image: "/images/features/3-Leads-CRM.png",
    accent: "#10B981",
    background:
      "bg-[radial-gradient(circle_at_center,rgba(16,185,129,.18)_0%,transparent_70%)]",
  },
] as const;