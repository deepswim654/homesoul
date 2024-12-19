import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { AuthResponse, authService } from '@/services/auth.service';

const emailChangeSchema = z.object({
  newEmail: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type EmailChangeFormData = z.infer<typeof emailChangeSchema>;

interface EmailTabProps {
  user: AuthResponse['user'];
  onError: (error: string) => void;
}

export const EmailTab: FC<EmailTabProps> = ({ user, onError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailChangeFormData>({
    resolver: zodResolver(emailChangeSchema),
  });

  const onSubmit = async (data: EmailChangeFormData) => {
    setIsLoading(true);
    setSuccessMessage(null);
    
    try {
      await authService.changeEmail({
        newEmail: data.newEmail,
        password: data.password,
      });
      
      setSuccessMessage('Verification email has been sent to your new email address. Please check your inbox.');
      reset();
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to change email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-1">Email Settings</h2>
        <p className="text-sm text-gray-500">Update your email address. You'll need to verify your new email.</p>
      </div>

      {successMessage && (
        <div className="p-4 bg-green-50 border-l-4 border-green-400 text-green-700">
          <p className="text-sm">{successMessage}</p>
        </div>
      )}

      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Email</label>
            <p className="mt-1 text-sm text-gray-900">{user.email}</p>
          </div>
          <div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              user.emailVerified
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {user.emailVerified ? 'Verified' : 'Pending Verification'}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700">
            New Email Address
          </label>
          <div className="mt-1">
            <input
              id="newEmail"
              type="email"
              autoComplete="email"
              className={`appearance-none block w-full px-3 py-2 border rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${
                errors.newEmail ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('newEmail')}
            />
            {errors.newEmail && (
              <p className="mt-1 text-sm text-red-500">{errors.newEmail.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className={`appearance-none block w-full px-3 py-2 border rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('password')}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? 'Changing Email...' : 'Change Email'}
          </Button>
        </div>
      </form>
    </div>
  );
}; 