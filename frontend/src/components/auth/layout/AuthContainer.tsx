import React, { ReactNode } from 'react';

export const AuthContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-full max-w-md mx-auto lg:max-w-none flex items-center justify-center">
      {children}
    </div>
  );
};