// Types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthUserResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface AuthState {
  user: AuthUserResponse | null;
  isAuthenticated: boolean;
  login: (userData: AuthUserResponse) => void;
  logout: () => void;
  setUser: (user: AuthUserResponse | null) => void;
}
