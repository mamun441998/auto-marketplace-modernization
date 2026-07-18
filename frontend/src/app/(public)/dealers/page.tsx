// src/app/dealers/page.tsx
import { Metadata } from "next";
import Container from "@/components/layout/Container";
import DealersHero from "@/components/dealers/DealersHero";
import DealersGrid from "@/components/dealers/DealersGrid";
import DealersCTA from "@/components/dealers/DealersCTA";

export const metadata: Metadata = {
  title: "Find A Dealership | MotoHave",
  description:
    "Browse verified dealerships on MotoHave and explore their live vehicle inventory. Find a trusted dealer near you.",
};

export default function DealersPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      {/* Hero */}
      <section className="relative bg-[#0A0A0A]">
        <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DealersHero />
        </Container>
      </section>

      {/* Dealer Grid + Filters */}
      <section className="relative bg-[#0F0F0F] border-t border-[#262626] py-14 lg:py-16">
        <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DealersGrid />
        </Container>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0A0A0A] border-t border-[#262626] py-16 lg:py-20 pb-24">
        <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DealersCTA />
        </Container>
      </section>
    </main>
  );
}