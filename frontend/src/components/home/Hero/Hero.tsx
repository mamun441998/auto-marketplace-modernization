"use client";

import Container from "@/components/layout/Container";
import ParticleNetwork from "./background/ParticleNetwork";
import HeroHeading from "./components/HeroHeading";
import HeroSlider from "./slider/HeroSlider";
import HeroCTA from "./components/HeroCTA";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0D0D10]">
      <ParticleNetwork />

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 50% 18%, rgba(56,189,248,.08), transparent 55%),
            radial-gradient(circle at 50% 80%, rgba(252,94,1,.05), transparent 60%)
          `,
        }}
      />

      <Container>
        <div className="relative z-10 flex flex-col items-center pt-8 sm:pt-12 pb-16">

          <HeroHeading />

          <div className="mt-8 w-full">
            <HeroSlider />
          </div>

          <div className="mt-8">
            <HeroCTA />
          </div>

        </div>
      </Container>
    </section>
  );
}