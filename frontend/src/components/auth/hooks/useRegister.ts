import { useState } from 'react';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (err: any) {
      setError(err.message || 'Failed to register account');
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};