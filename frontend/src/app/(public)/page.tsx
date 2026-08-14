"use client";

import Hero from "@/components/home/Hero/Hero";
import TrustedBrands from "@/components/home/TrustedBrands/TrustedBrands";
import EverythingSection from "@/components/home/Everything/EverythingSection";
import ProductShowcase from "@/components/home/ProductShowcase/ProductShowcase";
import FeaturesSection from "@/components/home/features/FeaturesSection";
import WhyMotoHave from "@/components/home/WhyMotoHave/WhyMotoHave";
import Testimonials from "@/components/home/Testimonials/Testimonials";
import FAQSection from "@/components/home/FAQ/FAQSection";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <main className="flex-1 overflow-x-clip">
        <Hero />
        <TrustedBrands />
        <EverythingSection />
        <ProductShowcase />
        <FeaturesSection />
        <WhyMotoHave />
        <Testimonials />
        <FAQSection />
      </main>
    </div>
  );
}