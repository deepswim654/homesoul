'use client';

import { FC, memo } from 'react';
import { motion } from 'framer-motion';
import { Shield, Leaf, Building2, Coins, Users2, TreePine } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Trusted Platform",
    description: "Secure and reliable ecosystem for sustainable development"
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Eco-Friendly Solutions",
    description: "Innovative green technologies for modern construction"
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Smart Development",
    description: "Intelligent building solutions for sustainable communities"
  },
  {
    icon: <Coins className="w-6 h-6" />,
    title: "Financial Benefits",
    description: "Attractive commission structure and investment returns"
  },
  {
    icon: <Users2 className="w-6 h-6" />,
    title: "Expert Network",
    description: "Connect with industry leaders and professionals"
  },
  {
    icon: <TreePine className="w-6 h-6" />,
    title: "Sustainable Future",
    description: "Contributing to a greener, more sustainable world"
  }
];

export const ServiceExplanation: FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Transform Your Business with{' '}
              <span className="text-primary">Sustainable Solutions</span>
            </h2>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
              HomeSoul provides comprehensive green building solutions and sustainable development services. 
              Join our platform to access cutting-edge technologies, expert knowledge, and lucrative opportunities 
              in the growing sustainable construction industry.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative lg:h-[600px] h-[400px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl overflow-hidden">
              <Image
                src="/assets/images/service-explanation.jpg"
                alt="Sustainable building solutions"
                fill
                className="object-cover mix-blend-overlay"
                quality={90}
              />
            </div>
            
            {/* Stats Overlay */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">30K+</div>
                  <div className="text-sm text-gray-600">Value in Benefits</div>
                </div>
                <div className="text-center border-x border-gray-200">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-gray-600">Eco-Friendly</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-gray-600">Expert Support</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(ServiceExplanation); 