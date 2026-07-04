"use client";

import Container from "@/components/layout/Container";
import FooterBrand from "./FooterBrand";
import FooterNavigation from "./FooterNavigation";
import FooterSolutions from "./FooterSolutions";
import FooterResources from "./FooterResources";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0C1A32] text-white border-t border-[#1e2a4a]">
      <Container className="max-w-7xl px-6 md:px-8 lg:px-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12 py-14">
          
          {/* Left Side - Logo + Description + Social (Brand) */}
          <div className="lg:col-span-2">
            <FooterBrand />
          </div>

          {/* Solutions */}
          <div>
            <FooterSolutions />
          </div>

          {/* Industries / Navigation */}
          <div>
            <FooterNavigation 
              title="Industries" 
              links={[
                { label: "Car Dealerships", href: "/industries/dealerships" },
                { label: "Auto Auctions", href: "/industries/auctions" },
                { label: "Used Car Dealers", href: "/industries/used-cars" },
                { label: "Buying Companies", href: "/industries/buyers" },
              ]} 
            />
          </div>

          {/* Company */}
          <div>
            <FooterNavigation 
              title="Company" 
              links={[
                { label: "About", href: "/about" },
                { label: "Case Studies", href: "/case-studies" },
                { label: "Pricing", href: "/pricing" },
                { label: "Integrations", href: "/integrations" },
                { label: "Contact", href: "/contact" },
              ]} 
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <FooterBottom />
      </Container>
    </footer>
  );
}