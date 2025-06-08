import { ButtonPrimary } from '@/components/ui/Button';
import { LabelText } from '@/components/ui/LabelText';
import { useAuthStore } from '@/hooks/useAuth';
import { LoginFormData } from '@/types/auth';
import { AlertCircle, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../hooks/useLogin';

type FormLoginProps = {
  onSuccess?: () => void;
  onError?: (mgs: string) => void;
};

export const FormLogin = ({ onSuccess, onError }: FormLoginProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const authStore = useAuthStore();
  const {
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const loginMutation = useLoginMutation();

  // Clear success state after 5 seconds
  useEffect(() => {
    if (loginMutation.isSuccess) {
      const timer = setTimeout(() => {
        loginMutation.reset();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loginMutation.isSuccess]);

  // Load remembered email
  useEffect(() => {
    const rememberMe = localStorage.getItem('remember_me');
    const savedEmail = localStorage.getItem('user_email');

    if (rememberMe === 'true' && savedEmail) {
      register('email').onChange({
        target: { value: savedEmail, type: 'email' },
      } as React.ChangeEvent<HTMLInputElement>);
      register('rememberMe').onChange({
        target: { checked: true, type: 'checkbox' },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    clearErrors();

    // // Validate form
    // const validationErrors = validateFormLogin(values);
    // if (Object.keys(validationErrors).length > 0) {
    //   Object.entries(validationErrors).forEach(([field, message]) => {
    //     setError(field as keyof LoginFormData, { message });
    //   });
    //   return;
    // }

    try {
      const userData = await loginMutation.mutateAsync(data);

      // Store user in auth store
      authStore.login(userData);

      // Handle remember me
      if (data.rememberMe) {
        localStorage.setItem('remember_me', 'true');
        localStorage.setItem('user_email', data.email);
      } else {
        localStorage.removeItem('remember_me');
        localStorage.removeItem('user_email');
      }
      onSuccess?.();

      console.log('Login successful:', userData);
    } catch (error) {
      onError?.(loginMutation.error?.message || 'Unknown error data');
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <LabelText to="email" text="Email" />
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-500 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <LabelText to="password" text="Password" />

        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {errors?.password && (
          <p className="mt-1 text-sm text-red-500 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.password.message}
          </p>
        )}

        {errors.root && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errors.root.message}</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            {...register('rememberMe')}
            className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
          />
          <span className="ml-2 text-sm text-gray-600">Remember Me</span>
        </label>

        <a
          href="#"
          className="text-sm text-teal-600 hover:text-teal-500 font-medium"
          onClick={e => {
            e.preventDefault();
            alert('Forgot password functionality would be implemented here');
          }}
        >
          Forgot Password?
        </a>
      </div>

      <ButtonPrimary
        type="submit"
        disabled={loginMutation.isPending}
        labelText="Login"
        labelLoadingText="Signing in..."
        isLoading={loginMutation.isPending}
      />
    </form>
  );
};
