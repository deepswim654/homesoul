'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/lib/contexts/AuthContext';
import { PageLayout } from '@/components/ui/PageLayout';
import { User } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <PageLayout maxWidth="4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-sm p-6 mb-6"
      >
        <div className="flex items-center gap-3">
          <User className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <p className="mt-1 text-sm text-gray-600">
              Your account information
            </p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-500">
              User ID
            </label>
            <div className="mt-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <code className="text-sm text-gray-900 font-mono">
                {user?.id || 'Loading...'}
              </code>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Name
            </label>
            <div className="mt-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-900">
                {user?.name || 'Not set'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default ProfilePage; 