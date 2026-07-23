import React, { useState } from 'react';
import Link from 'next/link';
import { featuresData } from './data/benefits';
import { BackgroundGlow } from './components/BackgroundGlow';
import { FloatingElements } from './components/FloatingElements';
import { SectionHeader } from './components/SectionHeader';
import { BenefitsGrid } from './components/BenefitsGrid';
import { ComparisonPanel } from './components/ComparisonPanel';
import { AnimatedStats } from './components/AnimatedStats';

export const WhyMotoHaveSection: React.FC = () => {
  const [activeFeatureId, setActiveFeatureId] = useState<string>(featuresData[0].id);

  const activeFeature = featuresData.find(f => f.id === activeFeatureId) || featuresData[0];

  return (
    <section className="relative bg-[#0A1429] py-24 px-4 sm:px-6 lg:px-12 w-full overflow-hidden">
      {/* Background Glow & Ambient Effects */}
      <BackgroundGlow />
      <FloatingElements />

      <div className="w-full max-w-[1600px] mx-auto relative z-10">
        {/* Header */}
        <SectionHeader />

        {/* Main Interactive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Interactive Feature Cards List */}
          <div className="lg:col-span-5 xl:col-span-4">
            <BenefitsGrid 
              features={featuresData}
              activeFeatureId={activeFeatureId}
              onSelectFeature={setActiveFeatureId}
            />
          </div>

          {/* Right Side: 3D Browser Mockup / Live Preview Panel */}
          <div className="lg:col-span-7 xl:col-span-8">
            <ComparisonPanel activeFeature={activeFeature} />
          </div>
        </div>

        {/* Trust Badges & Metrics Section */}
        <AnimatedStats />

        {/* CTA Button at the Bottom */}
        <div className="mt-16 flex items-center justify-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-[#FC5E01] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#FC5E01]/25 transition-all duration-300 hover:bg-[#e05401] hover:shadow-xl hover:shadow-[#FC5E01]/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Start Free Trial</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};