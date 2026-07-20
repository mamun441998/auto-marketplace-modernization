import React from 'react';

export const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Subtle floating particle dots */}
      <div className="absolute top-12 left-10 w-2 h-2 rounded-full bg-[#FC5E01]/40 animate-ping"></div>
      <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 rounded-full bg-blue-500/40 animate-pulse"></div>
      <div className="absolute top-1/3 right-16 w-2 h-2 rounded-full bg-[#FC5E01]/30 animate-pulse"></div>
    </div>
  );
};