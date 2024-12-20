'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon } from 'lucide-react';

const membershipTiers = [
  {
    name: 'Bronze',
    price: {
      monthly: 50,
      yearly: 299.99,
      yearlyRegular: 600,
    },
    features: [
      '25% discount on courses',
      'Quarterly industry seminars',
      'Platform commission: 20%',
      'Access to BILD and CHBA',
      'Industry expert access',
    ],
    color: 'from-amber-500/10 to-amber-500/30',
    borderColor: 'border-amber-500/20',
    buttonColor: 'bg-amber-500',
  },
  {
    name: 'Silver',
    price: {
      yearly: 3000,
    },
    features: [
      '50% discount on courses',
      'Quarterly industry seminars',
      'Platform commission: 40%',
      'Access to BILD and CHBA',
      'Priority industry expert access',
    ],
    color: 'from-gray-300/10 to-gray-400/30',
    borderColor: 'border-gray-300/20',
    buttonColor: 'bg-gray-400',
  },
  {
    name: 'Gold',
    price: {
      yearly: 10000,
    },
    features: [
      '75% discount on courses',
      'Quarterly industry seminars',
      'Platform commission: 60%',
      'Access to BILD and CHBA',
      'VIP industry expert access',
      '$3,000 sales guarantee',
    ],
    color: 'from-yellow-500/10 to-yellow-500/30',
    borderColor: 'border-yellow-500/20',
    buttonColor: 'bg-yellow-500',
  },
  {
    name: 'Platinum',
    price: {
      yearly: 20000, // 10,000 + min 10,000 founder fee
    },
    features: [
      '100% discount on courses',
      'Quarterly industry seminars',
      'Platform commission: 80%',
      'Access to BILD and CHBA',
      'Exclusive industry expert access',
      '$4,000 sales guarantee',
      'Potential shareholder opportunity',
      '5% annual founder fee commission',
    ],
    color: 'from-slate-600/10 to-slate-600/30',
    borderColor: 'border-slate-600/20',
    buttonColor: 'bg-slate-600',
    popular: true,
  },
];

export const MembershipSection: FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Join Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
              Membership
            </span>{' '}
            Program
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            Choose the perfect membership tier to accelerate your growth and success in the sustainable building industry
          </motion.p>
        </div>

        {/* Membership tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {membershipTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl backdrop-blur-xl bg-gradient-to-br ${tier.color} border ${tier.borderColor} p-6 shadow-lg flex flex-col h-full`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
                    Popular Choice
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <div className="space-y-1">
                  {tier.price.monthly && (
                    <div>
                      <span className="text-2xl font-bold text-gray-900">${tier.price.monthly}</span>
                      <span className="text-gray-600">/month</span>
                    </div>
                  )}
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      ${(tier.price.yearly / 1000).toFixed(1)}k
                    </span>
                    <span className="text-gray-600">/year</span>
                  </div>
                  {tier.price.yearlyRegular && (
                    <div className="text-sm text-gray-500">
                      <span className="line-through">${(tier.price.yearlyRegular / 1000).toFixed(1)}k/year</span>
                      <span className="ml-2 text-primary">after first year</span>
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-6 flex-grow">
                {tier.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + featureIndex * 0.1 }}
                    className="flex items-center text-gray-700"
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <Button
                variant="primary"
                className={`w-full ${tier.buttonColor} text-white hover:opacity-90 transition-opacity group mt-auto`}
              >
                <span>Get Started</span>
                <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Corporate membership */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Looking for Corporate Membership?</h3>
          <p className="text-gray-600 mb-6">
            Join our corporate program starting at $1,000/month or $10,000/year (20% OFF)
          </p>
          <Button variant="secondary" size="lg" className="group">
            <span>Contact Sales</span>
            <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}; 