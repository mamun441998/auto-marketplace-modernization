"use client";

import React, { useState } from 'react';
import { AuthInput } from '../shared/AuthInput';
import { AuthButton } from '../shared/AuthButton';

export const VerifyEmailForm: React.FC = () => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <AuthInput label="Verification Code" type="text" value={code} onChange={(e) => setCode(e.target.value)} required placeholder="Enter 6-digit code" maxLength={6} />
      <AuthButton type="submit">Verify Email</AuthButton>
    </form>
  );
};