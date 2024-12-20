'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { MembershipDashboard } from '@/components/features/MembershipDashboard';
import { ReferralSystem } from '@/components/features/ReferralSystem';
import { PageLayout } from '@/components/ui/PageLayout';

// Sample data - Replace with actual data from your backend
const sampleMembershipStats = {
  currentTier: 'Gold' as const,
  referralCount: 4,
  commissionsEarned: 2500,
  nextPaymentDate: '2024-01-15',
  discountRate: 75,
  platformCommission: 60,
  salesGuarantee: 3000,
  upcomingEvents: [
    {
      title: 'Q1 Industry Seminar',
      date: '2024-01-20',
      type: 'seminar' as const,
    },
    {
      title: 'Industry Analysis Dinner',
      date: '2024-02-15',
      type: 'dinner' as const,
    },
    {
      title: 'Sustainable Building Workshop',
      date: '2024-03-01',
      type: 'training' as const,
    },
  ],
};

const sampleReferralStats = {
  referralCode: 'GOLD123',
  referralLink: 'https://homesoul.com/ref/GOLD123',
  directReferrals: 3,
  secondLevelReferrals: 6,
  thirdLevelReferrals: 2,
  totalCommission: 3500,
  upgradeProgress: 4,
  commissionRates: {
    directReferral: 15,
    secondLevel: 7,
    thirdLevel: 3,
  },
};

export default function MembershipPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your membership...</p>
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
    <PageLayout maxWidth="7xl" className="py-8">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name || 'Member'}!</h1>
          <span className="text-sm text-gray-600">Member since {new Date(user.createdAt).toLocaleDateString()}</span>
        </div>

        <MembershipDashboard stats={sampleMembershipStats} />
        
        <ReferralSystem stats={sampleReferralStats} />
      </div>
    </PageLayout>
  );
} 