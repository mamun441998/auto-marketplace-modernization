"use client";

import Container from "@/components/layout/Container";

import ParticleNetwork from "./background/ParticleNetwork";

import HeroHeading from "./components/HeroHeading";
import HeroSlider from "./slider/HeroSlider";
import HeroCTA from "./components/HeroCTA";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0D0D10]">

      {/* ================= Background Animation ================= */}
      <ParticleNetwork />

      {/* Glow */}
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

        <div
          className="
            relative
            z-10

            flex
            flex-col
            items-center

            pt-8
            sm:pt-10
            md:pt-12
            lg:pt-14

            pb-8
          "
        >

          {/* ================= Heading ================= */}
          <HeroHeading />

          {/* ================= Slider ================= */}
          <div
            className="
              mt-5
              w-full
              max-w-[1350px]
            "
          >
            <HeroSlider />
          </div>

          {/* ================= CTA ================= */}
          <div className="mt-4">
            <HeroCTA />
          </div>

        </div>

      </Container>

    </section>
  );
}