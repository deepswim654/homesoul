'use client';

import { FC } from 'react';
import { ArrowRightIcon, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { IMAGES } from '@/constants/images';

export const HeroSection: FC = () => {
  return (
    <section className="relative min-h-screen">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0">
        <OptimizedImage
          src={IMAGES.HERO.BACKGROUND}
          alt="Smart home background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full flex flex-col justify-center pt-32 md:pt-36">
          <div className="max-w-2xl space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium">
                <span className="animate-pulse mr-2">🌱</span>
                Eco-friendly Living
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-heading text-4xl lg:text-5xl font-bold text-white leading-tight"
            >
              Transformm Your Home Into a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary">
                Smart Sanctuary
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base lg:text-lg text-gray-200 leading-relaxed"
            >
              Experience the future of living with intelligent energy management. 
              Save money, reduce your carbon footprint, and enjoy complete control 
              over your home environment.
            </motion.p>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="primary" size="lg" className="group">
                <span>Get Started</span>
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="secondary" size="lg" className="group">
                <PlayCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Watch Demo</span>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 divide-x divide-gray-700 pt-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="px-6 first:pl-0">
                  <div className="font-heading text-xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 tracking-wide mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const stats = [
  { value: '30%', label: 'Average Energy Savings' },
  { value: '24/7', label: 'Smart Monitoring' },
  { value: '100K+', label: 'Homes Transformed' },
];