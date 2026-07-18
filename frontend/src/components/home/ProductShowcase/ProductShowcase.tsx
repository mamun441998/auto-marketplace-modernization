"use client";

import { useState, useEffect, useCallback } from "react";
import Container from "@/components/layout/Container";
import ProductHeader from "./ProductHeader";
import ProductPreview from "./ProductPreview";
import ProductTabs from "./ProductTabs";

const tabs = ["dashboard", "inventory", "crm", "website", "ai-payments"];

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isPaused, setIsPaused] = useState(false);

  const nextTab = useCallback(() => {
    setActiveTab((currentTab) => {
      const currentIndex = tabs.indexOf(currentTab);
      const nextIndex = (currentIndex + 1) % tabs.length;
      return tabs[nextIndex];
    });
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextTab, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextTab]);

  return (
    <section className="relative -mt-px w-full bg-[#0A0A0A] pt-6 pb-12 md:pt-10 md:pb-16 border-t border-[#262626]">
      {/* 💡 Background decoration - overflow-hidden shudhu ei wrapper e, section e na */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#FC5E01]/5 blur-[140px] rounded-full" />
      </div>

      <Container className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductHeader />

        <div
          className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="flex justify-center lg:justify-end w-full lg:sticky lg:top-24 self-start">
            <ProductPreview activeTab={activeTab} />
          </div>
        </div>
      </Container>
    </section>
  );
}