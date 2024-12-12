'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BENEFITS } from '@/constants/features';

export const Showcase: FC = () => {
  return (
    <section className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Transform Your Living Space</h2>
            <p className="text-gray-300 mb-8">
              Our smart home solutions help you create a more comfortable, efficient, and sustainable living environment.
              Monitor and control your energy usage, automate your daily routines, and reduce your carbon footprint.
            </p>
            <ul className="space-y-4">
              {BENEFITS.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <span className="text-primary">✓</span>
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/assets/images/showcase/smart-home.jpg"
              alt="Smart home showcase"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 