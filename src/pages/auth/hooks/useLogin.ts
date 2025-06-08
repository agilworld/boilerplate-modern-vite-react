// hooks/useAuth.ts
import { authApi } from '@/services/authApi';
import { AuthUserResponse, LoginFormData } from '@/types/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthUserResponse, Error, LoginFormData>({
    mutationFn: authApi.login,
    onSuccess: data => {
      // Store token in memory or secure storage
      localStorage.setItem('authToken', data.token);

      // Cache user data
      queryClient.setQueryData(['user'], data);
    },
    onError: error => {
      console.error('Login failed:', error.message);
    },
  });
};
