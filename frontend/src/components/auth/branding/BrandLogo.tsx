"use client";

import React from 'react';
import Image from 'next/image';
import brandLogo from '@/assets/navbar-logo/main-brand-logo.png';

export const BrandLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      {/* লোগো সাইজ বড় করা হয়েছে (w-12 h-12 বা আপনার প্রয়োজন অনুযায়ী আরও বাড়াতে পারেন) */}
      <div className="relative w-100 h-80 flex items-center justify-center">
        <Image
          src={brandLogo}
          alt="MotoHave Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};