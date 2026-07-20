"use client";

import React, { useState } from 'react';
import { PasswordInput } from '../shared/PasswordInput';
import { AuthButton } from '../shared/AuthButton';

export const ResetPasswordForm: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <PasswordInput label="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
      <PasswordInput label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="••••••••" />
      <AuthButton type="submit">Update Password</AuthButton>
    </form>
  );
};