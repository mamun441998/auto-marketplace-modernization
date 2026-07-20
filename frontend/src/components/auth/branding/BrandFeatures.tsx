"use client";

import React from 'react';

export const BrandFeatures: React.FC = () => {
  const features = [
    'AI Lead Automation & Instant Responses',
    'Integrated Vehicle Website Builder',
    'Smart Inventory & Multi-Channel Sync',
    'Advanced CRM & Deal Tracking',
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-center gap-2.5 text-xs lg:text-sm font-medium text-foreground bg-card/30 border border-border/40 p-3 rounded-xl backdrop-blur-sm">
          <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
          <span className="truncate">{feature}</span>
        </div>
      ))}
    </div>
  );
};