'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, Calendar, Award } from 'lucide-react';

interface MembershipStats {
  currentTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  referralCount: number;
  commissionsEarned: number;
  nextPaymentDate: string;
  discountRate: number;
  platformCommission: number;
  salesGuarantee?: number;
  upcomingEvents: Array<{
    title: string;
    date: string;
    type: 'seminar' | 'dinner' | 'training';
  }>;
}

const MembershipDashboard: FC<{ stats: MembershipStats }> = ({ stats }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Membership Dashboard</h2>
        <span className={`px-4 py-1 rounded-full text-sm font-medium 
          ${stats.currentTier === 'Bronze' ? 'bg-amber-100 text-amber-800' :
            stats.currentTier === 'Silver' ? 'bg-gray-100 text-gray-800' :
            stats.currentTier === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
            'bg-slate-100 text-slate-800'}`}
        >
          {stats.currentTier} Member
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20"
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-gray-900">Referrals</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.referralCount}</p>
          <p className="text-sm text-gray-600">Active referrals</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border border-green-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h3 className="font-medium text-gray-900">Commissions</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">${stats.commissionsEarned}</p>
          <p className="text-sm text-gray-600">Total earned</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">Benefits</h3>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              {stats.discountRate}% course discount
            </p>
            <p className="text-sm text-gray-600">
              {stats.platformCommission}% platform commission
            </p>
            {stats.salesGuarantee && (
              <p className="text-sm text-gray-600">
                ${stats.salesGuarantee} sales guarantee
              </p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h3 className="font-medium text-gray-900">Next Payment</h3>
          </div>
          <p className="text-lg font-medium text-gray-900">{stats.nextPaymentDate}</p>
          <p className="text-sm text-gray-600">Due date</p>
        </motion.div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {stats.upcomingEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
            >
              <div>
                <h4 className="font-medium text-gray-900">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium
                ${event.type === 'seminar' ? 'bg-blue-100 text-blue-800' :
                  event.type === 'dinner' ? 'bg-purple-100 text-purple-800' :
                  'bg-green-100 text-green-800'}`}
              >
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembershipDashboard; 