'use client';

import { FC, memo } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, BookOpen, Users, Award } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus className="w-8 h-8" />,
    title: "Join HomeSoul",
    description: "Register as a business partner and unlock exclusive benefits"
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Learn & Grow",
    description: "Access our comprehensive training and certification programs"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Build Network",
    description: "Connect with industry experts and grow your referral network"
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Earn Rewards",
    description: "Enjoy commission benefits and exclusive member perks"
  }
];

export const ProcessSteps: FC = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50/50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Join our community in four simple steps and start your journey towards sustainable success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="flex flex-col items-center">
                {/* Step Number */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl font-bold text-gray-100 select-none">
                  {index + 1}
                </div>
                
                {/* Icon Container */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300 ease-out">
                    <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative">
                      {step.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center relative">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[calc(100%-60%)] h-[2px]">
                  <div className="w-full h-full bg-gradient-to-r from-primary/30 via-primary/20 to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Background Accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 blur-3xl opacity-50" style={{ clipPath: 'inset(0)' }} />
      </div>
    </section>
  );
};

export default memo(ProcessSteps); 