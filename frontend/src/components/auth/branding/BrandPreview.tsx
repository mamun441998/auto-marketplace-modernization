"use client";

import React from 'react';

export const BrandPreview: React.FC = () => {
  return (
    <div className="relative p-5 rounded-2xl bg-card/50 border border-orange-500/20 backdrop-blur-xl shadow-2xl space-y-4 overflow-hidden group">
      {/* Subtle Orange Glow Backdrop */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-semibold text-foreground flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          Live AI Lead Pipeline
        </span>
        <span className="text-orange-500 font-mono text-[10px] bg-orange-500/10 px-2 py-0.5 rounded">Syncing Active</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-background/60 border border-border/50 space-y-1">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Inventory Value</p>
          <p className="text-lg font-bold text-foreground">$4.2M</p>
        </div>
        <div className="p-3 rounded-xl bg-background/60 border border-border/50 space-y-1">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">AI Qualified Leads</p>
          <p className="text-lg font-bold text-orange-500">+342 / mo</p>
        </div>
      </div>
    </div>
  );
};