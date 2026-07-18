// src/components/home/ProductShowcase/ProductData.ts
import {
  LayoutDashboard,
  CarFront,
  Users,
  Globe,
  Sparkles,
} from "lucide-react";

export const products = [
  {
    id: "dashboard",
    title: "Dashboard Overview",
    subtitle: "See your entire dealership at a glance.",
    icon: LayoutDashboard,
    description:
      "Real-time KPIs, sales trends, lead sources and revenue tracking — all in one unified command center.",
    features: [
      "Real-time Sales & Revenue Tracking",
      "Live Lead Source Breakdown",
      "Team & Role-based Access",
      "Custom Report Widgets",
    ],
  },
  {
    id: "inventory",
    title: "Inventory Management",
    subtitle: "Manage your entire fleet and stock effortlessly.",
    icon: CarFront,
    description:
      "Track vehicles, VIN decoding, automated pricing tiers, stock availability, HD galleries, and specifications from one powerful centralized dashboard.",
    features: [
      "Smart VIN Decoding & Analytics",
      "HD Media & Gallery Management",
      "Real-time Stock Tracking",
      "Advanced Search & Pricing Filters",
    ],
  },
  {
    id: "crm",
    title: "CRM & Sales Pipeline",
    subtitle: "Turn every conversation into a successful sale.",
    icon: Users,
    description:
      "Organize customers, track communication channels, schedule automated follow-ups, and convert high-intent leads via visual pipelines.",
    features: [
      "Visual Lead & Sales Pipeline",
      "Automated Follow-up Reminders",
      "Centralized Customer Profiles",
      "Full Activity & Interaction History",
    ],
  },
  {
    id: "website",
    title: "Dealer Website Builder",
    subtitle: "Launch your modern digital showroom in minutes.",
    icon: Globe,
    description:
      "Deploy an ultra-fast, SEO-optimized website with native inventory synchronization, deep-linked lead capture forms, and analytics.",
    features: [
      "Next-gen Responsive Architecture",
      "Built-in Enterprise SEO Ready",
      "Dynamic Vehicle Search Engines",
      "High-converting Lead Capture Forms",
    ],
  },
  {
    id: "ai-payments",
    title: "AI Tools & Payments",
    subtitle: "Close deals faster with AI and secure checkout.",
    icon: Sparkles,
    description:
      "AI-powered vehicle pricing, auto-generated listings, and integrated checkout supporting Visa, Mastercard, PayPal and Stripe.",
    features: [
      "AI Vehicle Pricing Suggestions",
      "Auto-generated Descriptions",
      "Secure Multi-gateway Checkout",
      "Instant Payment Confirmation",
    ],
  },
];