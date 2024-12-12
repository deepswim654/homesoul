'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  features: string[];
  image: string;
  href: string;
}

const services: Service[] = [
  {
    title: "Academy",
    description: "Empowering individuals with skills and knowledge to thrive in the sustainable building and energy industry.",
    image: "/images/services/academy.jpg",
    href: "/services/academy",
    features: [
      "Tailored Training Programs",
      "Target Audience Focus",
      "Future Generations Focus",
      "Comprehensive Resources"
    ]
  },
  {
    title: "Consulting",
    description: "Expert support for sustainable construction and renovation projects, making the process seamless and efficient.",
    image: "/images/services/consulting.jpg",
    href: "/services/consulting",
    features: [
      "Project Guidance",
      "Sustainability Expertise",
      "Streamlined Solutions",
      "Resource Optimization"
    ]
  },
  {
    title: "Development and Construction",
    description: "Leverage technology to create safe, sustainable, and cost-effective building projects.",
    image: "/images/services/development.jpg",
    href: "/services/development",
    features: [
      "Innovative Software",
      "Eco-Friendly Construction",
      "On-Time Delivery",
      "Customized Solutions"
    ]
  },
  {
    title: "Building Material Supplier",
    description: "Access a curated network of manufacturers offering sustainable and innovative building materials.",
    image: "/images/services/materials.jpg",
    href: "/services/materials",
    features: [
      "Eco-Friendly Materials",
      "Smart Home Solutions",
      "Health-Focused Products",
      "Industry Collaboration"
    ]
  },
  {
    title: "Finance",
    description: "Comprehensive financial solutions to ensure your project's success and security.",
    image: "/images/services/finance.jpg",
    href: "/services/finance",
    features: [
      "Capital Raising",
      "Secure Payments",
      "Investment Opportunities",
      "Financial Stability"
    ]
  },
  {
    title: "The Dreamers Hub",
    description: "A community-driven space for collaboration, growth, and innovation in sustainable development.",
    image: "/images/services/dreamers.jpg",
    href: "/services/dreamers",
    features: [
      "Personal Development",
      "Collaboration Opportunities",
      "Mentorship Programs",
      "Innovative Culture"
    ]
  },
  {
    title: "Wellbeing",
    description: "Promoting a holistic approach to sustainability by integrating health and environmental consciousness.",
    image: "/images/services/wellbeing.jpg",
    href: "/services/wellbeing",
    features: [
      "Lifestyle Integration",
      "Health-Enhancing Solutions",
      "Community Focus",
      "Holistic Benefits"
    ]
  }
];

const ServiceRow: FC<{ service: Service; index: number }> = ({ service, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row items-center gap-8 py-16"
    >
      <div className={`w-full md:w-1/2 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
      
      <div className={`w-full md:w-1/2 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
        <p className="text-gray-600 mb-6">{service.description}</p>
        <ul className="space-y-3 mb-8">
          {service.features.map((feature, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-gray-700"
            >
              <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </motion.li>
          ))}
        </ul>
        <Link href={service.href}>
          <Button variant="primary" size="lg" className="group">
            <span>Learn More</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

const ServiceShowcase = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions for sustainable development and green living
          </p>
        </motion.div>

        <div className="divide-y divide-gray-200">
          {services.map((service, index) => (
            <ServiceRow key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceShowcase;