// src/app/inventory/page.tsx
import { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/layout/Container";
import InventoryHero from "@/components/inventory/InventoryHero";
import InventoryGrid from "@/components/inventory/InventoryGrid";
import InventoryCTA from "@/components/inventory/InventoryCTA";

export const metadata: Metadata = {
  title: "Vehicle Inventory | MotoHave",
  description:
    "Search thousands of vehicles from verified dealerships across the country. Filter by make, price, body type and more.",
};

export default function InventoryPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      {/* Hero */}
      <section className="relative bg-[#0A0A0A]">
        <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InventoryHero />
        </Container>
      </section>

      {/* Inventory Grid + Sidebar */}
      <section className="relative bg-[#0F0F0F] border-t border-[#262626] py-14 lg:py-16">
        <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center text-[#94A3B8] py-20">Loading inventory...</div>}>
            <InventoryGrid />
          </Suspense>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0A0A0A] border-t border-[#262626] py-16 lg:py-20 pb-24">
        <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InventoryCTA />
        </Container>
      </section>
    </main>
  );
}