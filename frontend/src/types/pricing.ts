// src/types/pricing.ts

export type BillingCycle = "monthly" | "yearly";

export interface PricingFeature {
  id: number;
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: number;
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  isPopular: boolean;
  ctaLabel: string;
  ctaHref: string;
  features: PricingFeature[];
}

export interface ComparisonFeatureRow {
  id: number;
  category: string;
  feature: string;
  starter: boolean | string;
  professional: boolean | string;
  enterprise: boolean | string;
}

export interface PricingFAQItem {
  id: number;
  question: string;
  answer: string;
}