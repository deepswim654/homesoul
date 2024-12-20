'use client';

import { FC, memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  features: string[];
  image: string;
  href: string;
}

const ServiceRow: FC<{ service: Service; index: number }> = memo(({ service, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    viewport={{ once: true, margin: "-50px" }}
    className="group relative overflow-hidden"
  >
    <Link href={service.href} className="block">
      <div className="relative h-[400px] rounded-2xl overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.title} service illustration`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={90}
          priority={index < 2}
          loading={index < 2 ? 'eager' : 'lazy'}
        />
        
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <div className="relative backdrop-blur-lg bg-white/10 rounded-2xl p-8 transform transition-all duration-500 group-hover:translate-y-0 translate-y-4 border border-white/10">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-3xl font-bold text-white">{service.title}</h3>
              <ArrowRightIcon className="w-6 h-6 text-white/90 transform translate-x-0 transition-transform duration-500 group-hover:translate-x-2" />
            </div>
            
            <p className="text-white/90 text-base leading-relaxed">{service.description}</p>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
));

ServiceRow.displayName = 'ServiceRow';

const services: Service[] = [
  {
    title: "Academy",
    description: "Empowering individuals with skills and knowledge to thrive in the sustainable building and energy industry.",
    image: "/assets/images/services/academy.jpg",
    href: "/academy",
    features: []
  },
  {
    title: "Consulting",
    description: "Expert support for sustainable construction and renovation projects, making the process seamless and efficient.",
    image: "/assets/images/services/consulting.jpg",
    href: "/consulting",
    features: []
  },
  {
    title: "Development",
    description: "Leverage technology to create safe, sustainable, and cost-effective building projects.",
    image: "/assets/images/services/development.jpg",
    href: "/development-and-construction",
    features: []
  },
  {
    title: "Materials",
    description: "Access a curated network of manufacturers offering sustainable and innovative building materials.",
    image: "/assets/images/services/materials.jpg",
    href: "/building-material-supplier",
    features: []
  },
  {
    title: "Finance",
    description: "Comprehensive financial solutions to ensure your project's success and security.",
    image: "/assets/images/services/finance.jpg",
    href: "/finance",
    features: []
  },
  {
    title: "Dreamers Hub",
    description: "A community-driven space for collaboration, growth, and innovation in sustainable development.",
    image: "/assets/images/services/dreamers.jpg",
    href: "/the-dreamers-hub",
    features: []
  },
  {
    title: "Wellbeing",
    description: "Promoting a holistic approach to sustainability by integrating health and environmental consciousness.",
    image: "/assets/images/services/wellbeing.jpg",
    href: "/wellbeing",
    features: []
  }
];

const ServiceShowcase: FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
              Key Features
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Explore our comprehensive solutions for sustainable development and green living
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceRow key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(ServiceShowcase);