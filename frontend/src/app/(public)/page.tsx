"use client";

import Hero from "@/components/home/hero/Hero";
import TrustedBrands from "@/components/home/TrustedBrands/TrustedBrands";
import EverythingSection from "@/components/home/Everything/EverythingSection";
import ProductShowcase from "@/components/home/ProductShowcase/ProductShowcase";
import FeaturesSection from "@/components/home/features/FeaturesSection";
import WhyMotoHaveSection from "@/components/home/WhyMotoHave/WhyMotoHaveSection";
import Testimonials from "@/components/home/Testimonials/Testimonials";
import FAQSection from "@/components/home/FAQ/FAQSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBrands />
      <EverythingSection />
      <ProductShowcase />
      <FeaturesSection />
      <WhyMotoHaveSection />
      <Testimonials />
      <FAQSection />
    </>
  );
}