import React, { useState } from 'react';

export const useForm = <T extends Record<string, any>>(defaultValues: T) => {
  const [values, setValues] = useState<T>(defaultValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const register = (name: keyof T) => ({
    value: values[name] || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setValues(prev => ({ ...prev, [name]: value }));
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
    },
    onBlur: () => {
      setTouched(prev => ({ ...prev, [name]: true }));
    },
  });

  const setError = (name: keyof T, message: string) => {
    setErrors(prev => ({ ...prev, [name]: message }));
  };

  const clearErrors = () => {
    setErrors({});
  };

  const reset = () => {
    setValues(defaultValues);
    setErrors({});
    setTouched({});
  };

  return {
    register,
    values,
    errors,
    touched,
    setError,
    clearErrors,
    reset,
    formState: {
      isValid: Object.keys(errors).length === 0,
      isDirty: JSON.stringify(values) !== JSON.stringify(defaultValues),
    },
  };
};
