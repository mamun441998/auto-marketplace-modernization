"use client";

import { motion } from "framer-motion";

import Container from "@/components/layout/Container";

import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

import HeroGlow from "./background/HeroGlow";
import HeroGrid from "./background/HeroGrid";
import HeroShapes from "./background/HeroShapes";
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0C1A32]">

  {/* Main Cinematic Glow */}
  <div
    className="
      pointer-events-none
      absolute
      inset-0
      z-0
    "
    style={{
      background: `
        radial-gradient(
          ellipse 900px 650px
          at 52% 12%,
          rgba(255,168,60,.22) 0%,
          rgba(255,135,35,.12) 28%,
          rgba(255,120,25,.05) 48%,
          rgba(12,26,50,0) 72%
        )
      `,
    }}
  />

  {/* Warm Center Glow */}
  <div
    className="
      pointer-events-none
      absolute
      inset-0
      z-0
    "
    style={{
      background: `
        radial-gradient(
          circle 650px
          at 58% 38%,
          rgba(255,120,35,.10) 0%,
          rgba(255,95,20,.05) 38%,
          transparent 75%
        )
      `,
    }}
  />

  {/* Right Golden Glow */}
  <div
    className="
      pointer-events-none
      absolute
      inset-0
      z-0
    "
    style={{
      background: `
        radial-gradient(
          circle 520px
          at 82% 45%,
          rgba(192, 113, 10, 0.16) 0%,
          rgba(202, 86, 18, 0.08) 38%,
          transparent 78%
        )
      `,
    }}
  />

  {/* Top Left Soft Orange */}
  <div
    className="
      pointer-events-none
      absolute
      inset-0
      z-0
    "
    style={{
      background: `
        radial-gradient(
          circle 420px
          at 8% 8%,
          rgba(228, 107, 9, 0.08) 0%,
          transparent 65%
        )
      `,
    }}
  />

  
      <HeroGlow />
      <HeroGrid />
      <HeroShapes />

      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 grid grid-cols-1 items-center gap-8 pt-12 pb-20 lg:grid-cols-[40%_60%] lg:gap-8 lg:min-h-[620px] lg:pt-10 lg:pb-24 xl:min-h-[680px]"
        >
          <HeroContent />
          <HeroVisual />
        </motion.div>
      </Container>
    </section>
  );
}