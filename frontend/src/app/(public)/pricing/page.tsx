import { Metadata } from "next";
import PricingHero from "@/components/pricing/pricing-hero";
import PricingCards from "@/components/pricing/pricing-cards";
import PricingComparison from "@/components/pricing/pricing-comparison";
import PricingFAQ from "@/components/pricing/pricing-faq";
import PricingCTA from "@/components/pricing/pricing-cta";

export const metadata: Metadata = {
  title: "Pricing | MotoHave - Dealership Management Platform",
  description:
    "Simple, transparent pricing for MotoHave. Choose the perfect plan for your dealership with a 14-day free trial. No credit card required.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0A0A]">
     <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pb-28 sm:pt-12 lg:px-8">
        <PricingHero />
        <PricingCards />
        <PricingComparison />
        <PricingFAQ />
        <PricingCTA />
      </div>
    </main>
  );
}