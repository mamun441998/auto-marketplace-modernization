"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const LoginForm: React.FC = () => {
  const router = useRouter();
  
  // ফর্ম ফিল্ডগুলোর জন্য স্টেট
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // ইনপুট পরিবর্তনের হ্যান্ডলার
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // ফর্ম সাবমিট ও API কল হ্যান্ডলার
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // Laravel API Endpoint (আপনার ব্যাকএন্ডের URL অনুযায়ী পরিবর্তন করে নেবেন)
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign in.');
      }

      // সফল হলে টোকেন সেভ করুন এবং ড্যাশবোর্ডে পাঠান
      localStorage.setItem('token', data.token);
      router.push('/dashboard');

    } catch (error: any) {
      setErrorMessage(error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl">
          {errorMessage}
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="name@company.com"
          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-orange-500 transition-colors text-sm"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider">
            Password
          </label>
          <Link href="/forgot-password" className="text-xs text-orange-500 hover:underline">
            Forgot password?
          </Link>
        </div>
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-orange-500 transition-colors text-sm"
        />
      </div>

      <div className="flex items-center">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
            className="w-4 h-4 rounded border-border text-orange-500 focus:ring-orange-500 bg-background"
          />
          Remember for 30 days
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50 text-sm"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
};