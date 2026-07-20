import React from 'react';

export const FloatingCards: React.FC = () => {
  return (
    <div className="absolute bottom-10 right-10 p-4 rounded-2xl bg-card/80 border border-border/50 backdrop-blur-xl shadow-2xl animate-bounce duration-1000 hidden lg:block">
      <p className="text-xs font-semibold text-foreground">🚀 Instant Deployment</p>
      <p className="text-[10px] text-muted-foreground">Your cluster is ready globally.</p>
    </div>
  );
};