// auth/types.ts

export type AuthMode = 'login' | 'register' | 'forgot-password' | 'verify-email' | 'reset-password';

export interface BaseAuthProps {
  isLoading?: boolean;
  error?: string | null;
  onSuccess?: () => void;
}

export interface PasswordStrength {
  score: number; // 0 to 4
  feedback: string[];
  isStrong: boolean;
}

export interface SocialProvider {
  id: 'google' | 'github' | 'microsoft';
  name: string;
  icon: string;
}