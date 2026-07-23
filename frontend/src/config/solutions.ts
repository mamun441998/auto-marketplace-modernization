// src/config/solutions.ts

import {
  Car,
  Users,
  Bot,
  Globe,
  Megaphone,
  CreditCard,
  BarChart3,
  Handshake,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export interface SolutionFeature {
  title: string;
  description: string;
}

export interface WorkflowStep {
  title: string;
  description: string;
}

export interface SolutionData {
  badge: string;
  title: string;
  description: string;
  icon: LucideIcon;

  features: SolutionFeature[];
  benefits: string[];
  workflow: WorkflowStep[];
}

export const solutions: Record<string, SolutionData> = {
  inventory: {
    badge: "Inventory Management",
    title: "Vehicle Inventory Management",
    description:
      "Manage unlimited vehicle inventory across all branches with real-time synchronization.",
    icon: Car,

    features: [
      {
        title: "Unlimited Vehicle Listings",
        description:
          "Add unlimited new and used vehicles with rich specifications.",
      },
      {
        title: "Real-time Inventory Sync",
        description:
          "Automatically sync inventory across all dealership branches.",
      },
      {
        title: "VIN Decoder",
        description:
          "Automatically detect vehicle specifications from VIN.",
      },
      {
        title: "Bulk Import",
        description: "Import inventory from Excel, CSV or API.",
      },
      {
        title: "Media Gallery",
        description: "Upload unlimited images and videos.",
      },
      {
        title: "Availability Tracking",
        description:
          "Track sold, reserved and available vehicles instantly.",
      },
    ],

    benefits: [
      "Reduce manual inventory management",
      "Increase inventory accuracy",
      "Real-time stock updates",
      "Improve customer trust",
    ],

    workflow: [
      {
        title: "Import Vehicles",
        description:
          "Bring in your entire inventory instantly via Excel, CSV or API.",
      },
      {
        title: "Organize Inventory",
        description:
          "Categorize and tag vehicles by branch, status and specification.",
      },
      {
        title: "Publish Listings",
        description:
          "Push vehicles live to your website and marketplace channels.",
      },
      {
        title: "Track Sales",
        description:
          "Monitor availability and sales performance in real time.",
      },
    ],
  },

  crm: {
    badge: "CRM",
    title: "CRM & Lead Management",
    description:
      "Capture, organize and convert every dealership lead from one dashboard.",
    icon: Users,

    features: [
      {
        title: "Lead Pipeline",
        description:
          "Track every customer from inquiry to purchase.",
      },
      {
        title: "Customer Profiles",
        description:
          "Complete interaction history.",
      },
      {
        title: "Task Automation",
        description:
          "Automatically assign leads.",
      },
      {
        title: "Sales Notes",
        description:
          "Keep every discussion organized.",
      },
    ],

    benefits: [
      "Increase conversion",
      "Never lose a lead",
      "Better customer relationships",
      "Centralized CRM",
    ],

    workflow: [
      {
        title: "Capture Lead",
        description:
          "Automatically collect leads from calls, forms and walk-ins.",
      },
      {
        title: "Assign Salesperson",
        description:
          "Route each lead to the right team member instantly.",
      },
      {
        title: "Follow-up",
        description:
          "Stay on top of every conversation with reminders and notes.",
      },
      {
        title: "Close Deal",
        description:
          "Convert qualified leads into completed vehicle sales.",
      },
    ],
  },

  "ai-automation": {
    badge: "AI",
    title: "AI Automation",
    description:
      "Automate dealership workflows with AI.",
    icon: Bot,

    features: [
      {
        title: "AI Chat Assistant",
        description:
          "Answer customer questions instantly.",
      },
      {
        title: "Lead Qualification",
        description:
          "Automatically score leads.",
      },
      {
        title: "Auto Follow-up",
        description:
          "AI sends reminders automatically.",
      },
      {
        title: "Smart Recommendations",
        description:
          "Suggest matching vehicles.",
      },
    ],

    benefits: [
      "Save staff time",
      "Increase response speed",
      "More qualified leads",
    ],

    workflow: [
      {
        title: "Receive Inquiry",
        description:
          "AI instantly captures and responds to every customer inquiry.",
      },
      {
        title: "AI Qualification",
        description:
          "Automatically score and prioritize leads based on intent.",
      },
      {
        title: "Sales Assignment",
        description:
          "Route qualified leads to the right salesperson automatically.",
      },
      {
        title: "Close Deal",
        description:
          "Finish the sale with AI-assisted follow-ups and reminders.",
      },
    ],
  },

  "website-builder": {
    badge: "Website Builder",
    title: "Website Builder",
    description:
      "Create dealership websites without coding.",
    icon: Globe,

    features: [
      {
        title: "Drag & Drop Builder",
        description:
          "Build pages visually.",
      },
      {
        title: "SEO Optimized",
        description:
          "Rank higher on Google.",
      },
      {
        title: "Dealer Branding",
        description:
          "Use your own logo and colors.",
      },
      {
        title: "Responsive",
        description:
          "Perfect on Desktop, Tablet & Mobile.",
      },
    ],

    benefits: [
      "Professional website",
      "Fast publishing",
      "Better conversions",
    ],

    workflow: [
      {
        title: "Choose Template",
        description:
          "Pick a dealership-ready template that fits your brand.",
      },
      {
        title: "Customize",
        description:
          "Add your logo, colors, inventory and content with drag & drop.",
      },
      {
        title: "Publish",
        description:
          "Go live instantly with a fully responsive, SEO-ready site.",
      },
      {
        title: "Generate Leads",
        description:
          "Turn website visitors into qualified sales inquiries.",
      },
    ],
  },

  marketing: {
    badge: "Marketing",
    title: "Marketing Suite",
    description:
      "Run campaigns from one dashboard.",
    icon: Megaphone,

    features: [
      {
        title: "Facebook Ads",
        description:
          "Launch campaigns easily.",
      },
      {
        title: "Google Ads",
        description:
          "Reach high-intent buyers.",
      },
      {
        title: "Email Marketing",
        description:
          "Automated customer campaigns.",
      },
      {
        title: "WhatsApp Campaigns",
        description:
          "Instant communication.",
      },
    ],

    benefits: [
      "More leads",
      "Higher ROI",
      "Better engagement",
    ],

    workflow: [
      {
        title: "Create Campaign",
        description:
          "Set up ads across Facebook, Google, Email and WhatsApp.",
      },
      {
        title: "Launch",
        description:
          "Publish your campaign to reach the right audience instantly.",
      },
      {
        title: "Track",
        description:
          "Monitor performance and engagement in real time.",
      },
      {
        title: "Optimize",
        description:
          "Refine targeting and budget for maximum ROI.",
      },
    ],
  },

  payments: {
    badge: "Payments",
    title: "Payments",
    description:
      "Accept payments securely.",
    icon: CreditCard,

    features: [
      {
        title: "Stripe Integration",
        description:
          "Accept online payments.",
      },
      {
        title: "Dealer Financing",
        description:
          "Flexible payment plans.",
      },
      {
        title: "Invoice Management",
        description:
          "Generate secure invoices instantly.",
      },
      {
        title: "Payment Tracking",
        description:
          "Track every payment status.",
      },
    ],

    benefits: [
      "Fast checkout",
      "Secure payments",
      "Easy reconciliation",
    ],

    workflow: [
      {
        title: "Generate Invoice",
        description:
          "Create a secure, itemized invoice for the customer instantly.",
      },
      {
        title: "Receive Payment",
        description:
          "Accept payment online via Stripe or flexible financing.",
      },
      {
        title: "Confirm",
        description:
          "Automatically verify and confirm the transaction.",
      },
      {
        title: "Complete Deal",
        description:
          "Finalize the sale with a fully reconciled payment record.",
      },
    ],
  },

  analytics: {
    badge: "Analytics",
    title: "Analytics & Reports",
    description:
      "Real-time dealership analytics.",
    icon: BarChart3,

    features: [
      {
        title: "Sales Dashboard",
        description:
          "Track revenue instantly.",
      },
      {
        title: "Lead Reports",
        description:
          "Monitor marketing performance.",
      },
      {
        title: "Inventory Reports",
        description:
          "Know what's selling.",
      },
      {
        title: "Customer Insights",
        description:
          "Understand buyer behavior.",
      },
    ],

    benefits: [
      "Better decisions",
      "Increase profits",
      "Identify trends",
    ],

    workflow: [
      {
        title: "Collect Data",
        description:
          "Automatically gather sales, inventory and lead data.",
      },
      {
        title: "Analyze",
        description:
          "Turn raw data into clear, actionable dashboards.",
      },
      {
        title: "Optimize",
        description:
          "Use insights to improve pricing, marketing and stock decisions.",
      },
    ],
  },

  "deal-closing": {
    badge: "Sales",
    title: "Sales & Deal Closing",
    description:
      "Close more vehicle sales faster.",
    icon: Handshake,

    features: [
      {
        title: "Digital Documents",
        description:
          "Paperless contracts.",
      },
      {
        title: "Negotiation Tools",
        description:
          "Quote management.",
      },
      {
        title: "Deal Tracking",
        description:
          "Monitor every deal stage.",
      },
      {
        title: "E-Signature",
        description:
          "Complete paperwork online.",
      },
    ],

    benefits: [
      "Faster deals",
      "Higher close rate",
      "Less paperwork",
    ],

    workflow: [
      {
        title: "Quote",
        description:
          "Generate a clear, professional price quote for the customer.",
      },
      {
        title: "Negotiate",
        description:
          "Manage offers and counteroffers in one organized thread.",
      },
      {
        title: "Sign",
        description:
          "Finalize the deal with secure digital e-signature.",
      },
      {
        title: "Deliver Vehicle",
        description:
          "Hand over the vehicle and close out the sale.",
      },
    ],
  },
};

export type SolutionKey = keyof typeof solutions;