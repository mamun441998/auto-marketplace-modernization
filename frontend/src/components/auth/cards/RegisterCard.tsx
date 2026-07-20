"use client";

import React from 'react';
import Link from 'next/link';
import { AuthCard } from './AuthCard';
import { RegisterForm } from '../forms/RegisterForm';
import { SocialLogin } from '../shared/SocialLogin';
import { AuthDivider } from '../shared/AuthDivider';

export const RegisterCard: React.FC = () => {
  return (
    <AuthCard title="Create an account" subtitle="Get started with your free SaaS trial today">
      <RegisterForm />
      <AuthDivider text="Or sign up with" />
      <SocialLogin />
      
      {/* সোশাল লোগিনের নিচে স্লিম সাইন ইন বাটন */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
        <p className="text-xs text-muted-foreground mb-2">
          Already have an account?
        </p>
        <Link 
          href="/sign-in" 
          className="w-full py-2 px-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-orange-400 hover:text-orange-300 transition-all text-xs font-semibold border border-slate-700/50 block text-center"
        >
          Sign in to your account
        </Link>
      </div>
    </AuthCard>
  );
};