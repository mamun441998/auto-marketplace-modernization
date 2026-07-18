// src/lib/pricing-data.ts

import { PricingPlan, ComparisonFeatureRow, PricingFAQItem } from "@/types/pricing";

export const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Starter",
    tagline: "Perfect for small independent dealerships",
    monthlyPrice: 49,
    yearlyPrice: 470, // ~20% off
    isPopular: false,
    ctaLabel: "Start Free Trial",
    ctaHref: "/register?plan=starter",
    features: [
      { id: 1, text: "Up to 50 vehicle listings", included: true },
      { id: 2, text: "Basic CRM & lead tracking", included: true },
      { id: 3, text: "1 team member", included: true },
      { id: 4, text: "Website marketing tools", included: true },
      { id: 5, text: "Email support", included: true },
      { id: 6, text: "Basic analytics dashboard", included: true },
      { id: 7, text: "AI vehicle pricing", included: false },
      { id: 8, text: "Auto auction access", included: false },
      { id: 9, text: "Custom ERP integration", included: false },
    ],
  },
  {
    id: 2,
    name: "Professional",
    tagline: "Built for growing multi-location dealerships",
    monthlyPrice: 129,
    yearlyPrice: 1238, // ~20% off
    isPopular: true,
    ctaLabel: "Start Free Trial",
    ctaHref: "/register?plan=professional",
    features: [
      { id: 1, text: "Up to 500 vehicle listings", included: true },
      { id: 2, text: "Advanced CRM & Sales pipeline", included: true },
      { id: 3, text: "Up to 10 team members", included: true },
      { id: 4, text: "Website marketing tools", included: true },
      { id: 5, text: "Priority support (24/7 chat)", included: true },
      { id: 6, text: "Advanced analytics & reports", included: true },
      { id: 7, text: "AI vehicle pricing", included: true },
      { id: 8, text: "Auto auction access", included: true },
      { id: 9, text: "Custom ERP integration", included: false },
    ],
  },
  {
    id: 3,
    name: "Enterprise",
    tagline: "For large dealership groups & franchises",
    monthlyPrice: 299,
    yearlyPrice: 2870, // ~20% off
    isPopular: false,
    ctaLabel: "Contact Sales",
    ctaHref: "/contact?plan=enterprise",
    features: [
      { id: 1, text: "Unlimited vehicle listings", included: true },
      { id: 2, text: "Advanced CRM & Sales pipeline", included: true },
      { id: 3, text: "Unlimited team members", included: true },
      { id: 4, text: "Website marketing tools", included: true },
      { id: 5, text: "Dedicated account manager", included: true },
      { id: 6, text: "Advanced analytics & reports", included: true },
      { id: 7, text: "AI vehicle pricing", included: true },
      { id: 8, text: "Auto auction access", included: true },
      { id: 9, text: "Custom ERP integration", included: true },
    ],
  },
];

export const comparisonFeatures: ComparisonFeatureRow[] = [
  // Inventory
  { id: 1, category: "Inventory", feature: "Vehicle listings", starter: "50", professional: "500", enterprise: "Unlimited" },
  { id: 2, category: "Inventory", feature: "Digital vehicle inspection", starter: false, professional: true, enterprise: true },
  { id: 3, category: "Inventory", feature: "AI-powered pricing suggestions", starter: false, professional: true, enterprise: true },

  // CRM & Sales
  { id: 4, category: "CRM & Sales", feature: "Lead management", starter: true, professional: true, enterprise: true },
  { id: 5, category: "CRM & Sales", feature: "Sales pipeline automation", starter: false, professional: true, enterprise: true },
  { id: 6, category: "CRM & Sales", feature: "Auto auction system access", starter: false, professional: true, enterprise: true },

  // Team
  { id: 7, category: "Team", feature: "Team members", starter: "1", professional: "10", enterprise: "Unlimited" },
  { id: 8, category: "Team", feature: "Role-based permissions", starter: false, professional: true, enterprise: true },

  // Analytics
  { id: 9, category: "Analytics", feature: "Basic reporting", starter: true, professional: true, enterprise: true },
  { id: 10, category: "Analytics", feature: "Advanced analytics & insights", starter: false, professional: true, enterprise: true },
  { id: 11, category: "Analytics", feature: "Custom report builder", starter: false, professional: false, enterprise: true },

  // Support & Integration
  { id: 12, category: "Support", feature: "Support channel", starter: "Email", professional: "24/7 Chat", enterprise: "Dedicated Manager" },
  { id: 13, category: "Support", feature: "Custom ERP integration", starter: false, professional: false, enterprise: true },
  { id: 14, category: "Support", feature: "API access", starter: false, professional: true, enterprise: true },
];

export const pricingFAQs: PricingFAQItem[] = [
  {
    id: 1,
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade or downgrade your plan anytime from your dashboard. Changes take effect immediately, and billing is prorated automatically.",
  },
  {
    id: 2,
    question: "Is there a free trial?",
    answer: "Yes, all plans come with a 14-day free trial. No credit card required to get started.",
  },
  {
    id: 3,
    question: "What payment methods do you accept?",
    answer: "We accept Visa, Mastercard, PayPal, and Stripe-supported payment methods for all subscription plans.",
  },
  {
    id: 4,
    question: "Do you offer discounts for annual billing?",
    answer: "Yes, choosing yearly billing saves you approximately 20% compared to monthly billing on all plans.",
  },
  {
    id: 5,
    question: "What happens if I exceed my listing limit?",
    answer: "We'll notify you before you reach your limit. You can upgrade your plan anytime to increase your vehicle listing capacity.",
  },
  {
    id: 6,
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription anytime from your account settings with no cancellation fees.",
  },
];