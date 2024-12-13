'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Home, Users, Lightbulb, Recycle, Building } from 'lucide-react';

interface BentoItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const BentoItem: FC<BentoItemProps> = ({ title, description, icon, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 ${className}`}
  >
    <div className="text-primary mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-300 text-sm">{description}</p>
  </motion.div>
);

export const BentoGrid: FC = () => {
  return (
    <section className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Building Sustainable Communities</h2>
          <p className="text-gray-300 max-w-2xl">
            Empowering lives through innovative technology and sustainable development solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BentoItem
            icon={<Home className="w-8 h-8" />}
            title="Smart Living"
            description="Innovative home automation solutions for efficient and comfortable living spaces"
            className="md:col-span-2"
          />
          <BentoItem
            icon={<Leaf className="w-8 h-8" />}
            title="Eco-Friendly"
            description="Sustainable practices and materials for environmentally conscious construction"
          />
          <BentoItem
            icon={<Users className="w-8 h-8" />}
            title="Community Focus"
            description="Building stronger communities through collaborative development"
          />
          <BentoItem
            icon={<Lightbulb className="w-8 h-8" />}
            title="Innovation"
            description="Cutting-edge technology integration for modern living solutions"
            className="md:col-span-2"
          />
          <BentoItem
            icon={<Building className="w-8 h-8" />}
            title="Sustainable Development"
            description="Creating lasting value through responsible construction practices"
            className="md:col-span-2"
          />
          <BentoItem
            icon={<Recycle className="w-8 h-8" />}
            title="Resource Optimization"
            description="Efficient resource utilization for minimal environmental impact"
          />
        </div>
      </div>
    </section>
  );
};
