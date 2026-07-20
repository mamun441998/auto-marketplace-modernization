"use client";

import React, { useState } from 'react';
import { AuthInput } from '../shared/AuthInput';
import { AuthButton } from '../shared/AuthButton';

export const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return <div className="text-center text-sm text-muted-foreground p-4">Reset instructions sent to your email.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <AuthInput label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="name@company.com" />
      <AuthButton type="submit">Send Reset Instructions</AuthButton>
    </form>
  );
};