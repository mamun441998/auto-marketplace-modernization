import React from 'react';

export const FormError: React.FC<{ message?: string | null }> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium animate-shake">
      {message}
    </div>
  );
};