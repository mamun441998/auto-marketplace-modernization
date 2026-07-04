"use client";

import { useState, useEffect, useCallback } from "react";
import Container from "@/components/layout/Container";
import ProductHeader from "./ProductHeader";
import ProductPreview from "./ProductPreview";
import ProductTabs from "./ProductTabs";

const tabs = ["inventory", "crm", "website"];

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState("inventory");
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
    // 💡 এখানে pt (padding-top) কমিয়ে আরও স্পেস কমানো হয়েছে
    <section
  className="
    relative
    -mt-px
    w-full
    overflow-hidden

    bg-gradient-to-b
    from-blue-100
    via-white
    to-white

    pt-6
    pb-12

    md:pt-10
    md:pb-16
  "
>
      
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/5 to-transparent blur-[140px] rounded-full pointer-events-none" />

      <Container className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductHeader />
        {/* mt (margin-top) আরও কমিয়ে দেওয়া হয়েছে হেডার ও নিচের কন্টেন্টের মাঝে */}
        <div 
          className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full" 
          onMouseEnter={() => setIsPaused(true)} 
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="lg:col-span-5 w-full order-2 lg:order-1">
            <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="lg:col-span-7 w-full flex justify-center lg:justify-end order-1 lg:order-2">
            <ProductPreview activeTab={activeTab} />
          </div>
        </div>
      </Container>
    </section>
  );
}