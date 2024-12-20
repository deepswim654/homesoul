'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon, Copy, Users, TrendingUp } from 'lucide-react';

interface ReferralStats {
  referralCode: string;
  referralLink: string;
  directReferrals: number;
  secondLevelReferrals: number;
  thirdLevelReferrals: number;
  totalCommission: number;
  upgradeProgress: number;
  commissionRates: {
    directReferral: number;
    secondLevel: number;
    thirdLevel: number;
  };
}

const ReferralSystem: FC<{ stats: ReferralStats }> = ({ stats }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You might want to add a toast notification here
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Referral Program</h2>
        <p className="text-gray-600">Share your referral code and earn commissions</p>
      </div>

      {/* Referral Code Section */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-white rounded-lg border border-gray-200"
          >
            <h3 className="text-sm font-medium text-gray-600 mb-2">Your Referral Code</h3>
            <div className="flex items-center justify-between">
              <code className="text-lg font-mono font-medium text-primary">
                {stats.referralCode}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(stats.referralCode)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-white rounded-lg border border-gray-200"
          >
            <h3 className="text-sm font-medium text-gray-600 mb-2">Referral Link</h3>
            <div className="flex items-center justify-between">
              <code className="text-sm font-mono text-gray-800 truncate">
                {stats.referralLink}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(stats.referralLink)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-gray-900">Direct Referrals</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{stats.directReferrals}</p>
          <p className="text-sm text-gray-600">{stats.commissionRates.directReferral}% commission</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">Second Level</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{stats.secondLevelReferrals}</p>
          <p className="text-sm text-gray-600">{stats.commissionRates.secondLevel}% commission</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-purple-600" />
            <h3 className="font-medium text-gray-900">Third Level</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{stats.thirdLevelReferrals}</p>
          <p className="text-sm text-gray-600">{stats.commissionRates.thirdLevel}% commission</p>
        </motion.div>
      </div>

      {/* Upgrade Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-50 p-6 rounded-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-gray-900">Upgrade Progress</h3>
          </div>
          <span className="text-sm font-medium text-gray-600">
            {stats.upgradeProgress}/6 referrals
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(stats.upgradeProgress / 6) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Refer 6 members to upgrade your membership tier
        </p>
      </motion.div>
    </div>
  );
};

export default ReferralSystem; 