"use client";

import React from 'react';

export const FloatingBlob: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute w-[450px] h-[450px] rounded-full mix-blend-screen filter blur-[120px] opacity-25 pointer-events-none ${className}`}
    />
  );
};