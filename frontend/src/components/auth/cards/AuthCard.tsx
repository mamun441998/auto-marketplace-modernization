"use client";

import React, { ReactNode } from 'react';

export const AuthCard: React.FC<{ children: ReactNode; title: string; subtitle?: string }> = ({ children, title, subtitle }) => {
  return (
    <div className="w-full max-w-[480px] p-8 sm:p-10 rounded-3xl bg-card/60 border border-orange-500/20 backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(249,115,22,0.15)] space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">{title}</h2>
        {subtitle && <p className="text-xs sm:text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};