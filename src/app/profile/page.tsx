'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { PageLayout } from '@/components/ui/PageLayout';
import { useRouter } from 'next/navigation';
import { User, Settings, Bell, Shield, Key } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, type ProfileFormData } from '@/lib/validations/profile';

const ProfilePage = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <PageLayout maxWidth="4xl">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  if (!user) {
    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setError(null);

    try {
      // TODO: Implement profile update
      console.log('Profile update:', data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update profile');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'security', label: 'Security', icon: Key },
  ];

  return (
    <PageLayout maxWidth="4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-sm p-6 mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your account settings and preferences
        </p>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <nav className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-sm"
      >
        {activeTab === 'profile' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Personal Information</h2>
            
            {error && (
              <div className="mb-6 bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* User ID - Read Only */}
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  User ID
                </label>
                <div className="mt-1 flex items-center">
                  <code className="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-200 font-mono text-sm text-gray-900">
                    {user?.id || 'Loading...'}
                  </code>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(user?.id || '')}
                    className="ml-2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Copy ID"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">This is your unique identifier in our system</p>
              </div>

              {/* Name - Read Only for now */}
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Name
                </label>
                <div className="mt-1">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-900">{user?.name || 'Not set'}</p>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">Your display name in the platform</p>
              </div>

              {/* Email - Read Only */}
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Email Address
                </label>
                <div className="mt-1">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-900">{user?.email || 'Not set'}</p>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">Your verified email address</p>
              </div>

              {/* Account Status */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Account Status</h3>
                    <p className="text-sm text-gray-500">Your account verification status</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user?.emailVerified
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user?.emailVerified ? 'Verified' : 'Pending Verification'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Preferences</h2>
            {/* Add settings content */}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Notification Settings</h2>
            {/* Add notifications content */}
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Privacy Settings</h2>
            {/* Add privacy content */}
          </div>
        )}

        {activeTab === 'security' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Security Settings</h2>
            {/* Add security content */}
          </div>
        )}
      </motion.div>
    </PageLayout>
  );
};

export default ProfilePage; 