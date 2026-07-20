"use client";

import { useMemo, useState } from "react";

import Container from "@/components/layout/Container";

import ProductData from "./ProductData";
import ProductHeader from "./ProductHeader";
import ProductTabs from "./ProductTabs";
import ProductFeature from "./ProductFeature";

import FeatureCircle from "./components/FeatureCircle";

import useOrbit from "./hooks/useOrbit";

export default function ProductShowcase() {
  const radius = useOrbit();

  const modules = useMemo(
    () => ProductData.modules,
    []
  );

  const [active, setActive] = useState(modules[0].id);

  const activeModule =
    modules.find((m) => m.id === active) ??
    modules[0];

  return (
    <section
      className="
        relative
        overflow-hidden

        border-t
        border-white/5

        bg-[#0D0D10]

        py-20
        lg:py-28
      "
    >
      {/* Background */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:34px_34px] opacity-20" />

        <div
          className="
            absolute
            left-1/2
            top-0

            h-[900px]
            w-[900px]

            -translate-x-1/2

            rounded-full

            bg-[#FC5E01]/5

            blur-[220px]
          "
        />
      </div>

      <Container className="relative z-10">
        {/* Header */}

        <ProductHeader />

        {/* Tabs */}

        <div className="mt-10">
          <ProductTabs
            modules={modules}
            active={active}
            onChange={setActive}
          />
        </div>

        {/* Main */}

        <div
          className="
            mt-16

            grid
            grid-cols-1
            items-center
            gap-12

            lg:grid-cols-[520px_minmax(0,1fr)]
          "
        >
          {/* LEFT */}

          <div className="flex justify-center">
            <FeatureCircle
              features={modules}
              active={active}
              radius={radius}
              onSelect={setActive}
            />
          </div>

          {/* RIGHT */}

          <ProductFeature
            active={activeModule}
          />
        </div>
      </Container>
    </section>
  );
}