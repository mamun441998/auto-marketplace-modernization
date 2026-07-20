import { useMemo } from 'react';
import { PasswordStrength } from '../types';

export const usePasswordStrength = (password: string): PasswordStrength => {
  return useMemo(() => {
    let score = 0;
    const feedback: string[] = [];

    if (!password) return { score: 0, feedback: ['Enter a password'], isStrong: false };

    if (password.length >= 8) score += 1;
    else feedback.push('At least 8 characters');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Include uppercase letter');

    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('Include a number');

    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push('Include a special symbol');

    return {
      score,
      feedback,
      isStrong: score >= 3,
    };
  }, [password]);
};