import React from 'react';
import { FeatureItem } from '../types';
import { CheckCircle2, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

interface ComparisonPanelProps {
  activeFeature: FeatureItem;
}

export const ComparisonPanel: React.FC<ComparisonPanelProps> = ({ activeFeature }) => {
  return (
    <div className="sticky top-28 bg-[#111827] border border-[#1F2937] rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden relative group">
      {/* Top Browser Bar Mockup */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1F2937]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="text-xs text-[#94A3B8] font-mono bg-[#0A1429] px-4 py-1 rounded-full border border-[#1F2937] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FC5E01] animate-pulse"></span>
          motohave.io/app/{activeFeature.id}
        </div>
        <div className="text-xs text-[#94A3B8] font-medium hidden sm:block">Live Preview</div>
      </div>

      {/* Main Dynamic Content Display with Smooth Transition */}
      <div className="transition-all duration-300 ease-in-out transform">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FC5E01]/10 text-[#FC5E01] text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Module Showcase
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">
              {activeFeature.title}
            </h3>
          </div>
          {activeFeature.metrics && (
            <div className="bg-[#0A1429] border border-[#1F2937] px-4 py-2.5 rounded-xl text-right">
              <div className="text-xs text-[#94A3B8]">{activeFeature.metrics.label}</div>
              <div className="text-xl font-black text-[#FC5E01]">{activeFeature.metrics.value}</div>
            </div>
          )}
        </div>

        <p className="text-sm md:text-base text-[#94A3B8] mb-8 leading-relaxed">
          {activeFeature.description}
        </p>

        {/* Feature Detail Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {activeFeature.details.map((detail, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 p-3 rounded-xl bg-[#0A1429]/60 border border-[#1F2937]/70"
            >
              <CheckCircle2 className="w-4 h-4 text-[#FC5E01] flex-shrink-0" />
              <span className="text-xs md:text-sm font-medium text-white/90">{detail}</span>
            </div>
          ))}
        </div>

        {/* Interactive Dashboard Graphic / UI Mockup representation */}
        <div className="bg-[#0A1429] rounded-2xl p-5 border border-[#1F2937] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FC5E01]/5 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FC5E01]/20 flex items-center justify-center text-[#FC5E01]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">System Status: Active</div>
                <div className="text-[10px] text-[#94A3B8]">Cloud synchronization operational</div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-green-500/10 text-green-400 text-xs font-semibold">
              Optimized
            </span>
          </div>
          {/* Simulated chart bars or progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-[#94A3B8]">
              <span>Workflow Efficiency</span>
              <span className="text-white font-semibold">98.4%</span>
            </div>
            <div className="w-full h-2 bg-[#1F2937] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#FC5E01] to-amber-500 rounded-full w-[98%] transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};