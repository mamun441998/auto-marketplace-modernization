import React, { useState } from 'react';
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
      </div>
    </section>
  );
};