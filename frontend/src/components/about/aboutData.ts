// src/components/about/aboutData.ts
import {
  Target,
  Heart,
  ShieldCheck,
  Zap,
  LucideIcon,
} from "lucide-react";

export interface ValueItem {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const values: ValueItem[] = [
  {
    id: 1,
    icon: Target,
    title: "Dealer-First Thinking",
    description:
      "Every feature we build starts with a real dealership problem. We work closely with dealers to make sure what we ship actually saves time on the ground.",
  },
  {
    id: 2,
    icon: Zap,
    title: "Move Fast, Stay Reliable",
    description:
      "We ship improvements constantly, but never at the cost of stability. Your inventory, leads and payments run on infrastructure built to stay online.",
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "Security By Default",
    description:
      "Dealership and customer data is sensitive. Encryption, role-based access and secure payments are built into the platform from day one, not bolted on later.",
  },
  {
    id: 4,
    icon: Heart,
    title: "Genuine Support",
    description:
      "Real people answer support requests, including evenings and weekends. We treat every dealership like a long-term partner, not a ticket number.",
  },
];

export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
}

export const timeline: TimelineItem[] = [
  {
    id: 1,
    year: "2024",
    title: "The Idea",
    description:
      "Founded after seeing dealerships juggle 4-5 disconnected tools just to manage inventory, leads and a website.",
  },
  {
    id: 2,
    year: "2025",
    title: "First 100 Dealerships",
    description:
      "Launched core inventory and CRM modules. Onboarded our first 100 dealerships across multiple regions.",
  },
  {
    id: 3,
    year: "2025",
    title: "Website & Marketing Tools",
    description:
      "Introduced the built-in website builder and marketing automation, letting dealers launch a full digital presence in hours, not weeks.",
  },
  {
    id: 4,
    year: "2026",
    title: "AI & Payments",
    description:
      "Rolled out AI-powered pricing and description tools, along with integrated Visa, Mastercard, PayPal and Stripe checkout.",
  },
  {
    id: 5,
    year: "Today",
    title: "530+ Dealerships",
    description:
      "MotoHave now powers inventory, sales and marketing for dealerships managing over 15,000 vehicles combined.",
  },
];