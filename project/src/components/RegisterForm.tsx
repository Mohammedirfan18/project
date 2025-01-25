import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Update the schema to use number for departmentId
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  departmentId: z.number().optional(), // Change to number
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { register: registerUser, error } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data); // Pass data directly
      navigate('/');
    } catch (err) {
      // Error is handled by the AuthContext
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {[
        { label: 'Email', id: 'email', type: 'email' },
        { label: 'Password', id: 'password', type: 'password' },
        { label: 'First Name', id: 'firstName', type: 'text' },
        { label: 'Last Name', id: 'lastName', type: 'text' },
        { label: 'Department ID', id: 'departmentId', type: 'number' }, // Add departmentId as a number input
      ].map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.id}
            {...register(field.id as keyof RegisterFormData, {
              valueAsNumber: field.type === 'number', // Convert to number if the type is number
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            aria-describedby={`${field.id}-error`}
          />
          {errors[field.id as keyof RegisterFormData] && (
            <p
              id={`${field.id}-error`}
              className="mt-1 text-sm text-red-600"
            >
              {errors[field.id as keyof RegisterFormData]?.message}
            </p>
          )}
        </div>
      ))}

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}