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
    className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
  >
    <Link href={service.href} className="flex flex-col md:flex-row items-center">
      <div className={`w-full md:w-1/3 relative h-48 md:h-40 overflow-hidden rounded-t-xl md:rounded-tr-none md:rounded-l-xl`}>
        <Image
          src={service.image}
          alt={`${service.title} service illustration`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          quality={75}
          priority={index < 1}
          loading={index < 1 ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>
      
      <div className={`w-full md:w-2/3 p-6 md:p-8 rounded-b-xl md:rounded-l-none md:rounded-r-xl`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
          <ArrowRightIcon className="w-5 h-5 text-primary transform translate-x-0 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {service.features.map((feature, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {feature}
            </span>
          ))}
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
    image: "/assets/images/services/consulting.jpg",
    href: "/consulting",
    features: [
      "Project Guidance",
      "Sustainability Expertise",
      "Streamlined Solutions",
      "Resource Optimization"
    ]
  },
  {
    title: "Development",
    description: "Leverage technology to create safe, sustainable, and cost-effective building projects.",
    image: "/assets/images/services/development.jpg",
    href: "/development-and-construction",
    features: [
      "Innovative Software",
      "Eco-Friendly Construction",
      "On-Time Delivery",
      "Customized Solutions"
    ]
  },
  {
    title: "Materials",
    description: "Access a curated network of manufacturers offering sustainable and innovative building materials.",
    image: "/assets/images/services/materials.jpg",
    href: "/building-material-supplier",
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
    image: "/assets/images/services/finance.jpg",
    href: "/finance",
    features: [
      "Capital Raising",
      "Secure Payments",
      "Investment Opportunities",
      "Financial Stability"
    ]
  },
  {
    title: "Dreamers Hub",
    description: "A community-driven space for collaboration, growth, and innovation in sustainable development.",
    image: "/assets/images/services/dreamers.jpg",
    href: "/the-dreamers-hub",
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
    image: "/assets/images/services/wellbeing.jpg",
    href: "/wellbeing",
    features: [
      "Lifestyle Integration",
      "Health-Enhancing Solutions",
      "Community Focus",
      "Holistic Benefits"
    ]
  }
];

const ServiceShowcase: FC = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
          <p className="text-gray-600 max-w-2xl">
            Explore our comprehensive solutions for sustainable development and green living
          </p>
        </motion.div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <ServiceRow key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(ServiceShowcase);