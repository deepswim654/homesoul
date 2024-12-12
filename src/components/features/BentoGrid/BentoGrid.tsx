'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { LightbulbIcon, LeafIcon, HomeIcon, BatteryChargingIcon } from 'lucide-react';

export const BentoGrid: FC = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Main Feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 row-span-2 bg-gradient-to-br from-primary-dark via-primary to-primary-light p-8 rounded-3xl text-white group hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
          >
            <div className="h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 bg-white/10 rounded-2xl w-fit">
                  <HomeIcon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">Smart Home Integration</h3>
                <p className="text-white/90 leading-relaxed">
                  Seamlessly connect all your home devices into one intelligent ecosystem. 
                  Control everything from lighting to security with a single tap.
                </p>
              </div>
              <div className="mt-8 inline-flex items-center text-sm font-medium group-hover:translate-x-2 transition-transform">
                Learn more <span className="ml-2">→</span>
              </div>
            </div>
          </motion.div>

          {/* Energy Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-2 bg-gray-900 p-8 rounded-3xl group hover:shadow-xl transition-all duration-300"
          >
            <div className="p-3 bg-primary/10 rounded-2xl w-fit">
              <BatteryChargingIcon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">Energy Tracking</h3>
            <p className="mt-3 text-gray-400 leading-relaxed">Real-time monitoring of your energy consumption with AI-powered insights</p>
          </motion.div>

          {/* Eco Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-1 bg-green-50 p-8 rounded-3xl group hover:shadow-xl transition-all duration-300"
          >
            <div className="p-3 bg-green-500/10 rounded-2xl w-fit">
              <LeafIcon className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Eco-Friendly</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">Sustainable solutions for a greener future</p>
          </motion.div>

          {/* Smart Lighting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-1 bg-amber-50 p-8 rounded-3xl group hover:shadow-xl transition-all duration-300"
          >
            <div className="p-3 bg-amber-500/10 rounded-2xl w-fit">
              <LightbulbIcon className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Smart Lighting</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">Automated lighting for comfort and efficiency</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 