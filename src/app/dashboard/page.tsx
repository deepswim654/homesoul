'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('Dashboard page - Auth state:', { user, isLoading });
    if (!isLoading && !user) {
      console.log('No authenticated user, redirecting to login...');
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user.name || 'User'}!</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Your Dashboard</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{user.email}</span>
            {user.emailVerified && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Verified
              </span>
            )}
          </div>
          <p className="text-gray-600">
            This is your personal dashboard. More features coming soon!
          </p>
        </div>
      </div>
    </div>
  );
} 