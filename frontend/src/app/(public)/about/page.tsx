// src/app/about/page.tsx
import { Metadata } from "next";
import Container from "@/components/layout/Container";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutStats from "@/components/about/AboutStats";
import AboutValues from "@/components/about/AboutValues";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us | MotoHave - Dealership Management Platform",
  description:
    "Learn how MotoHave started and why 530+ dealerships trust us to run their inventory, CRM, website, marketing and payments from one platform.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      {/* Hero */}
      <section className="relative bg-[#0A0A0A]">
        <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutHero />
        </Container>
      </section>

      {/* Story */}
      <section className="relative bg-[#0F0F0F] border-t border-[#262626] py-20 lg:py-24">
        <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutStory />
        </Container>
      </section>

      {/* Stats */}
      <section className="relative bg-[#0A0A0A] border-t border-[#262626] py-16 lg:py-20">
        <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutStats />
        </Container>
      </section>

      {/* Values */}
      <section className="relative bg-[#0F0F0F] border-t border-[#262626] py-20 lg:py-24">
        <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutValues />
        </Container>
      </section>

      {/* Timeline */}
      <section className="relative bg-[#0A0A0A] border-t border-[#262626] py-20 lg:py-24">
        <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutTimeline />
        </Container>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0F0F0F] border-t border-[#262626] py-16 lg:py-20 pb-24">
        <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutCTA />
        </Container>
      </section>
    </main>
  );
}