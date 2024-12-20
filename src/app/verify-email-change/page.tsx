'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { PageLayout } from '@/components/ui/PageLayout';
import { Button } from '@/components/ui/Button';

const VerifyEmailChangePage = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setError('Invalid verification link');
        return;
      }

      try {
        await authService.verifyEmailChange(token);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        setError(error instanceof Error ? error.message : 'Failed to verify email');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <PageLayout maxWidth="sm" className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        {status === 'loading' && (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Verifying Email</h1>
            <p className="text-gray-600">Please wait while we verify your new email address...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="mb-4 text-green-500">
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Email Verified Successfully</h1>
            <p className="text-gray-600 mb-6">Your email address has been successfully updated.</p>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => router.push('/profile')}
            >
              Go to Profile
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="mb-4 text-red-500">
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Verification Failed</h1>
            <p className="text-red-600 mb-6">{error || 'Failed to verify email'}</p>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => router.push('/profile')}
            >
              Return to Profile
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default VerifyEmailChangePage; 