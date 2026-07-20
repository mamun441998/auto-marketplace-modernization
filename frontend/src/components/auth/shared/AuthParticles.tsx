import React from 'react';

export const AuthParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <div className="absolute w-2 h-2 bg-primary rounded-full top-1/4 left-1/3 animate-ping" />
      <div className="absolute w-1.5 h-1.5 bg-secondary rounded-full top-3/4 left-2/3 animate-pulse" />
    </div>
  );
};