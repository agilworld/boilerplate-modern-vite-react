import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useAuthStore } from "@/hooks/useAuth"
import { AuthUserResponse, LoginFormData } from "@/types/auth"
import { FormLogin } from './components/FormLogin';

const LoginPage: React.FC = () => {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [isSuscces, setIsSuccess] = useState(false)
  const [errorApi, setErrorApi] = useState("")
  const authStore = useAuthStore();
 
  React.useEffect(() => {
    const storedUser = sessionStorage.getItem('auth_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        authStore.setUser(user);
      } catch (error) {
        console.error('Failed to parse stored user data');
        sessionStorage.removeItem('auth_user');
      }
    }
  }, []);

  const handleGoogleLogin = () => {
    // Mock Google OAuth
    const mockGoogleUser: AuthUserResponse = {
      id: 999,
      username: 'google_user',
      email:'user@gmail.com',
      firstName: 'Google',
      lastName: 'User',
      token: 'mock_google_token'
    };
    
    authStore.login(mockGoogleUser);
    alert('Google OAuth integration - Mock login successful!');
  };

  const onSuccess = () => {
    setErrorApi("")
    setIsSuccess(true)
  }

  const onError = (msg:string) => {
    setIsSuccess(false)
    setErrorApi(msg)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-500 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10 flex flex-col justify-center items-start p-12 max-w-md">
          <div className="mb-8">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-white rounded-full"></div>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Your <span className="italic">Trusted</span> Digital<br />
              Transformation Partner
            </h1>
          </div>
          
          <div className="mt-auto">
            <blockquote className="text-lg italic mb-4 opacity-90">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
            </blockquote>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white bg-opacity-30 rounded-full mr-3"></div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm opacity-75">VP of A Great Company</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute bottom-20 right-32 w-24 h-24 bg-white bg-opacity-5 rounded-full"></div>
      </div>
      
      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="lg:hidden mb-8 text-center">
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Digital Transformation</h2>
          </div>
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isCreateAccount ? 'Create Account' : 'Login to your Account'}
            </h2>
            <p className="text-gray-600">
              {isCreateAccount ? 'Join us and start your journey' : 'See what is going on with your business'}
            </p>
          </div>
          
          {/* Status Messages */}
          {isSuscces && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-green-700">Login successful! Redirecting...</span>
            </div>
          )}
          
          {errorApi && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700">{errorApi}</span>
            </div>
          )}
          
          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors flex items-center justify-center disabled:opacity-50"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                or Sign in with Email
              </span>
            </div>
          </div>
          
          <FormLogin onSuccess={onSuccess} onError={onError} />
          
          <div className="mt-6 text-center">
            <span className="text-gray-600">Not Registered Yet? </span>
            <button
              onClick={() => setIsCreateAccount(!isCreateAccount)}
              className="text-teal-600 hover:text-teal-500 font-medium"
            >
              Create an account
            </button>
          </div>
          
          {/* Demo Credentials Helper */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">Demo Credentials</h4>
            <p className="text-xs text-yellow-700 mb-2">
              For testing, use any email format with any password (6+ characters).
              The form uses DummyJSON API for authentication demo.
            </p>
            <div className="text-xs text-yellow-600">
              <p><strong>Auth Store Status:</strong> {authStore.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</p>
              {/* <p><strong>Form Dirty:</strong> {formState.isDirty ? 'Yes' : 'No'}</p>
              <p><strong>Form Valid:</strong> {formState.isValid ? 'Yes' : 'No'}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;