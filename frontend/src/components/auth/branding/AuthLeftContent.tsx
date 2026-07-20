"use client";

import React from 'react';
import Link from 'next/link';
import { BrandHeadline } from './BrandHeadline';
import { BrandFeatures } from './BrandFeatures';
import { BrandStats } from './BrandStats';
import { BrandPreview } from './BrandPreview';

export const AuthLeftContent: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 relative">
      {/* কন্টেন্ট অংশ: মোবাইলে হেডিং সাইজ ছোট ও এক লাইনে রাখার জন্য স্টাইল */}
      <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
        <div className="flex justify-center lg:justify-start">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-xs font-semibold tracking-wide uppercase">
            🚀 Next-Gen Dealership OS
          </span>
        </div>
        
        {/* মোবাইলে ফন্ট সাইজ ছোট করা হয়েছে যাতে এক লাইনে দেখায় */}
        <div className="[&>h1]:text-[22px] sm:[&>h1]:text-3xl lg:[&>h1]:text-5xl [&>h1]:leading-tight [&>h1]:text-center lg:[&>h1]:text-left [&>p]:text-center lg:[&>p]:text-left [&>p]:text-xs sm:[&>p]:text-sm">
          <BrandHeadline />
        </div>
      </div>

      <BrandFeatures />
      <BrandPreview />
      
      {/* পরিসংখ্যানগুলো সেন্টারে করার জন্য র‍্যাপার */}
      <div className="text-center [&_div]:justify-center">
        <BrandStats />
      </div>

      {/* ফুটার লিংকস: এটি শুধুমাত্র মোবাইলের নিচে দেখাবে (ডেস্কটপে হিডেন থাকবে) */}
      <div className="w-full pt-4 pb-2 border-t border-slate-800/80 flex items-center justify-center space-x-6 text-xs sm:text-sm lg:hidden">
        <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors font-medium whitespace-nowrap">
          Home
        </Link>
        <Link href="/book-demo" className="text-muted-foreground hover:text-foreground transition-colors font-medium whitespace-nowrap">
          Book Demo
        </Link>
        <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors font-medium whitespace-nowrap">
          Need Help?
        </Link>
      </div>
    </div>
  );
};