// src/components/auth/branding/BrandStats.tsx
"use client";

import React from 'react';

export const BrandStats: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/40">
      <div>
        <p className="text-2xl font-black text-foreground">120K+</p>
        <p className="text-xs text-muted-foreground">Active Vehicles</p>
      </div>
      <div>
        <p className="text-2xl font-black text-foreground">800+</p>
        <p className="text-xs text-muted-foreground">Dealerships</p>
      </div>
      <div>
        <p className="text-2xl font-black text-foreground">99.9%</p>
        <p className="text-xs text-muted-foreground">Uptime SLA</p>
      </div>
    </div>
  );
};