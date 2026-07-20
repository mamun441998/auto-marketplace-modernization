"use client";

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export const SocialLogin: React.FC = () => {
  const handleGoogleLogin = () => {
    // Google Auth logic here
    console.log("Google Login Clicked");
  };

  const handleGithubLogin = () => {
    // GitHub Auth logic here
    console.log("GitHub Login Clicked");
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-background/50 border border-border/80 hover:border-orange-500/50 hover:bg-card/80 transition-all font-medium text-sm text-foreground shadow-sm group"
      >
        {/* রিয়েল গুগল কালারফুল আইকন */}
        <FcGoogle className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span>Google</span>
      </button>

      <button
        type="button"
        onClick={handleGithubLogin}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-background/50 border border-border/80 hover:border-orange-500/50 hover:bg-card/80 transition-all font-medium text-sm text-foreground shadow-sm group"
      >
        {/* রিয়েল গিটহাব আইকন */}
        <FaGithub className="w-5 h-5 text-foreground group-hover:scale-110 transition-transform" />
        <span>GitHub</span>
      </button>
    </div>
  );
};