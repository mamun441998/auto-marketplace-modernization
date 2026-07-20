"use client";

import React, { ReactNode } from 'react';
import { GridBackground } from '../animations/GridBackground';
import { FloatingBlob } from '../animations/FloatingBlob';

export const AuthBackground: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#090a0f] text-foreground overflow-hidden selection:bg-orange-500 selection:text-white">
      <GridBackground />
      {/* Dark + Orange Glow Blobs */}
      <FloatingBlob className="bg-orange-600 -top-40 -left-40 animate-pulse duration-1000" />
      <FloatingBlob className="bg-amber-500 -bottom-40 -right-40 animate-pulse duration-700" />
      
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        {children}
      </div>
    </div>
  );
};