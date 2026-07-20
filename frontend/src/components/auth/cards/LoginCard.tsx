"use client";

import React from 'react';
import Link from 'next/link';
import { AuthCard } from './AuthCard';
import { LoginForm } from '../forms/LoginForm';
import { SocialLogin } from '../shared/SocialLogin';
import { AuthDivider } from '../shared/AuthDivider';

export const LoginCard: React.FC = () => {
  return (
    <AuthCard title="Welcome back" subtitle="Enter your credentials to access your workspace">
      <LoginForm />
      <AuthDivider />
      <SocialLogin />
      
      {/* সোশ্যাল অথ/লগইনের নিচে স্লিম অ্যাকাউন্ট ক্রিয়েট বাটন */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
        <p className="text-xs text-muted-foreground mb-2">
          Don&apos;t have an account?
        </p>
        <Link 
          href="/register" 
          className="w-full py-2 px-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-orange-400 hover:text-orange-300 transition-all text-xs font-semibold border border-slate-700/50 block text-center"
        >
          Create an account
        </Link>
      </div>
    </AuthCard>
  );
};