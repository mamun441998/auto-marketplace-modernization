"use client";

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '../branding/BrandLogo';

export const AuthNavbar: React.FC<{ mode?: 'login' | 'register' }> = () => {
  return (
    <header className="w-full max-w-7xl mx-auto flex items-center justify-center lg:justify-between -mt-8 sm:-mt-12 lg:mt-4 pt-0 pb-0 overflow-hidden px-4 lg:px-0"> 
      {/* মোবাইলে মাঝখানে (justify-center) এবং ডেস্কটপে বামপাশে (lg:justify-start) রাখার জন্য */}
      <div className="w-full flex justify-center lg:justify-start">
        <Link href="/" className="flex transform -translate-y-2 lg:translate-y-0">
          <BrandLogo />
        </Link>
      </div>
      
      {/* ডেস্কটপের জন্য নেভিগেশন লিংকগুলো */}
      <div className="hidden lg:flex items-center gap-6 text-sm whitespace-nowrap">
        <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
          Home
        </Link>
        <Link href="/book-demo" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
          Book Demo
        </Link>
        <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
          Need Help?
        </Link>
      </div>
    </header>
  );
};