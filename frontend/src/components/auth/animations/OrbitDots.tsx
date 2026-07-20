import React from 'react';

export const OrbitDots: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <div className="w-[500px] h-[500px] rounded-full border border-border/25 animate-spin duration-[20000ms]" />
    </div>
  );
};