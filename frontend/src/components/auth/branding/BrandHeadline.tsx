"use client";

import React from 'react';

export const BrandHeadline: React.FC = () => {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
        Supercharge your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Dealership</span> with AI.
      </h1>
      <p className="text-muted-foreground text-xs sm:text-sm lg:text-base leading-relaxed">
        Automate vehicle inventory, CRM pipelines, and lead conversion seamlessly from a single unified operating system.
      </p>
    </div>
  );
};