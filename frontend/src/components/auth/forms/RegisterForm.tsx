"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export const RegisterForm: React.FC = () => {
  const router = useRouter();

  // রেজিস্টার ফর্মের জন্য স্টেট
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (formData.password !== formData.password_confirmation) {
      setErrorMessage('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      // Laravel Register API Endpoint
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create account.');
      }

      // সফল হলে টোকেন সেভ করে ড্যাশবোর্ডে রিডাইরেক্ট করুন
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
          Full Name
        </label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-orange-500 transition-colors text-sm"
        />
      </div>

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
        <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
          Password
        </label>
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

      <div>
        <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          name="password_confirmation"
          required
          value={formData.password_confirmation}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-orange-500 transition-colors text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50 text-sm"
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  );
};