'use client';

import { FC, memo } from 'react';
import { ArrowRightIcon, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import Image from 'next/image';

const stats = [
  { value: '7+', label: 'Green Services' },
  { value: '$30K+', label: 'Partner Benefits' },
  { value: '100%', label: 'Sustainable Focus' },
];

const HeroStats = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    className="grid grid-cols-3 divide-x divide-gray-200 mt-12"
  >
    {stats.map((stat, index) => (
      <div key={index} className="px-6 first:pl-0">
        <div className="font-heading text-xl font-bold text-gray-900">
          {stat.value}
        </div>
        <div className="text-xs text-gray-500 tracking-wide mt-1">
          {stat.label}
        </div>
      </div>
    ))}
  </motion.div>
));

HeroStats.displayName = 'HeroStats';

export const HeroSection: FC = () => {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute top-0 right-0 w-full h-full left-0 hidden md:block">
        <div className="relative h-full w-2/5 ml-auto">
          <Image
            src="/assets/images/hero/background.png"
            alt="Sustainable building"
            fill
            className="object-contain object-right"
            priority
            sizes="40vw"
            quality={75}
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative w-full h-full">
        <div className="h-full flex flex-col justify-start md:justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-primary/10">
                <span className="mr-2">🌿</span>
                HomeSoul Ecology
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mt-8"
            >
              Building Sustainable{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                Communities
              </span>{' '}
              Together
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base lg:text-lg text-gray-600 leading-relaxed mt-6"
            >
              Join our ecosystem of green innovation, sustainable development, and community growth. 
              Transform the future of living with expert guidance and comprehensive solutions.
            </motion.p>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <Button variant="primary" size="lg" className="group">
                <span>Become a Partner</span>
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="secondary" size="lg" className="group">
                <PlayCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Watch Overview</span>
              </Button>
            </motion.div>

            {/* Stats */}
            <HeroStats />
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(HeroSection);