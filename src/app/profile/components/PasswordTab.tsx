import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { authService } from '@/services/auth.service';

const passwordChangeSchema = z.object({
  currentPassword: z.string().min(6, 'Password must be at least 6 characters'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;

interface PasswordTabProps {
  onError: (error: string) => void;
}

export const PasswordTab: FC<PasswordTabProps> = ({ onError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordChangeFormData>({
    resolver: zodResolver(passwordChangeSchema),
  });

  const onSubmit = async (data: PasswordChangeFormData) => {
    setIsLoading(true);
    setSuccessMessage(null);
    
    try {
      await authService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      
      setSuccessMessage('Your password has been successfully changed.');
      reset();
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-1">Change Password</h2>
        <p className="text-sm text-gray-500">
          Ensure your account is using a strong, secure password.
        </p>
      </div>

      {successMessage && (
        <div className="p-4 bg-green-50 border-l-4 border-green-400 text-green-700">
          <p className="text-sm">{successMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <div className="mt-1">
            <input
              id="currentPassword"
              type="password"
              autoComplete="current-password"
              className={`appearance-none block w-full px-3 py-2 border rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${
                errors.currentPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('currentPassword')}
            />
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.currentPassword.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="mt-1">
            <input
              id="newPassword"
              type="password"
              autoComplete="new-password"
              className={`appearance-none block w-full px-3 py-2 border rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${
                errors.newPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('newPassword')}
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.newPassword.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <div className="mt-1">
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              className={`appearance-none block w-full px-3 py-2 border rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
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
            {isLoading ? 'Changing Password...' : 'Change Password'}
          </Button>
        </div>
      </form>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-sm font-medium text-gray-900">Password Requirements</h3>
        <div className="mt-2 space-y-1">
          <p className="text-xs text-gray-500">• At least 8 characters long</p>
          <p className="text-xs text-gray-500">• Contains at least one uppercase letter</p>
          <p className="text-xs text-gray-500">• Contains at least one lowercase letter</p>
          <p className="text-xs text-gray-500">• Contains at least one number</p>
          <p className="text-xs text-gray-500">• Contains at least one special character</p>
        </div>
      </div>
    </div>
  );
}; 