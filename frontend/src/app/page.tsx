"use client";

import Hero from "@/components/home/hero/Hero";
import ProductShowcase from "@/components/home/ProductShowcase/ProductShowcase";
import FeaturesSection from "@/components/home/features/FeaturesSection";
import EverythingSection from "@/components/home/Everything/EverythingSection";
import WhyMotoHaveSection from "@/components/home/WhyMotoHave/WhyMotoHaveSection";
import PricingSection from "@/components/home/Pricing/PricingSection";
import Testimonials from "@/components/home/Testimonials/Testimonials";
import FAQSection from "@/components/home/FAQ/FAQSection";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <ProductShowcase />
        <FeaturesSection />
        <EverythingSection />
        <WhyMotoHaveSection />
        <PricingSection />
        <Testimonials />
        <FAQSection />
        <footer />
      </main>

      
    </>
  );
}