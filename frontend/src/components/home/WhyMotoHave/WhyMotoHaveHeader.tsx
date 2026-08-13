import React from 'react';

export const SectionHeader: React.FC = () => {
  return (
    <div className="text-center max-w-7xl mx-auto mb-16 relative z-10 px-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#FC5E01] text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[#FC5E01] animate-pulse"></span>
        Why MotoHave
      </div>
      
      <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight whitespace-normal lg:whitespace-nowrap">
        One Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FC5E01] to-amber-500">Every Dealership Need.</span>
      </h2>
      
      <p className="mt-4 text-base md:text-lg text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
        Stop juggling disconnected tools, spreadsheets, and legacy software. MotoHave combines your entire dealership workflow into a single, high-performance ecosystem.
      </p>
    </div>
  );
};