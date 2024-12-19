import { FC } from 'react';
import { AuthResponse } from '@/services/auth.service';

interface ProfileTabProps {
  user: AuthResponse['user'];
}

export const ProfileTab: FC<ProfileTabProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-1">Profile Information</h2>
        <p className="text-sm text-gray-500">View and manage your profile information.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-500">Role</label>
          <div className="mt-1">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-900 capitalize">{user.role.toLowerCase()}</p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">Member Since</label>
          <div className="mt-1">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-900">
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 