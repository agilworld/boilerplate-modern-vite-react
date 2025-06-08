import { AuthUserResponse } from '@/types/auth';
// Auth API functions
export const authApi = {
  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<AuthUserResponse> => {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'emilys', // Demo username
        password: 'emilyspass', // Demo password
      }),
    });

    if (!response.ok) {
      throw new Error(
        'Invalid credentials. Please check your email and password.'
      );
    }

    const data = await response.json();

    if (!data.accessToken) {
      throw new Error('Login failed. Please try again.');
    }

    return {
      id: data.id,
      username: data.username,
      email: data.email, // Use provided email
      firstName: data.firstName,
      lastName: data.lastName,
      token: data.accessToken,
    };
  },
};
