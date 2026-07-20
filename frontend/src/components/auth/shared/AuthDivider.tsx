"use client";

import React from 'react';

export const AuthDivider: React.FC<{ text?: string }> = ({ text = 'Or continue with' }) => {
  return (
    <div className="relative my-6 flex items-center justify-center">
      {/* বাঁ পাশের লাইন */}
      <div className="flex-grow border-t border-border/80" />
      
      {/* মাঝের টেক্সট - কোনো ব্যাকগ্রাউন্ড ছাড়াই দুইপাশে মার্জিন দিয়ে গ্যাপ রাখা হয়েছে */}
      <span className="flex-shrink mx-4 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
        {text}
      </span>
      
      {/* ডান পাশের লাইন */}
      <div className="flex-grow border-t border-border/80" />
    </div>
  );
};