import { AuthState, AuthUserResponse } from '@/types/auth';
import { useEffect, useState } from 'react';

export const useAuthStore = (() => {
  let state: AuthState = {
    user: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    setUser: () => {},
  };

  const listeners = new Set<() => void>();

  const setState = (newState: Partial<AuthState>) => {
    state = { ...state, ...newState };
    listeners.forEach(listener => listener());
  };

  return () => {
    const [, forceUpdate] = useState({});

    useEffect(() => {
      const listener = () => forceUpdate({});
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    }, []);

    return {
      ...state,
      login: (userData: AuthUserResponse) => {
        setState({
          user: userData,
          isAuthenticated: true,
        });
        // Store in sessionStorage for persistence
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('auth_user', JSON.stringify(userData));
        }
      },
      logout: () => {
        setState({
          user: null,
          isAuthenticated: false,
        });
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('auth_user');
        }
      },
      setUser: (user: AuthUserResponse | null) => {
        setState({
          user,
          isAuthenticated: !!user,
        });
      },
    };
  };
})();
