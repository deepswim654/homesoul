'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { NAV_ITEMS } from '@/constants/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Navigation: FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform values based on scroll
  const headerBackgroundOpacity = useTransform(
    scrollY,
    [0, 50],
    ["0.1", "0.9"]
  );
  
  const headerHeight = useTransform(
    scrollY,
    [0, 50],
    ["5rem", "4rem"]
  );

  const scale = useTransform(
    scrollY,
    [0, 50],
    [1, 0.95]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <motion.div 
        className={cn(
          "absolute inset-0 backdrop-blur-lg transition-all duration-300",
          isScrolled 
            ? "bg-white border-b border-gray-100" 
            : "bg-black/10"
        )}
        style={{ opacity: isScrolled ? headerBackgroundOpacity : 1 }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.nav 
          className="flex items-center justify-between"
          style={{ height: headerHeight }}
        >
          {/* Logo */}
          <motion.div style={{ scale }}>
            <Link 
              href="/" 
              className={cn(
                "relative flex items-center space-x-2 text-xl font-bold transition-colors duration-300",
                isScrolled ? "text-gray-900" : "text-white"
              )}
            >
              <span className={cn(
                "transition-colors duration-300",
                isScrolled 
                  ? "bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent" 
                  : "text-white"
              )}>
                HomeSoul
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors duration-300",
                  isScrolled 
                    ? "text-gray-600 hover:text-gray-900" 
                    : "text-gray-100 hover:text-white"
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className={cn(
                      "absolute inset-0 rounded-lg -z-10",
                      isScrolled ? "bg-gray-100" : "bg-white/10"
                    )}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div 
            className="hidden md:flex items-center space-x-4"
            style={{ scale }}
          >
            <Button 
              variant={isScrolled ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "transition-colors duration-300",
                isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white"
              )}
            >
              Log in
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              className={cn(
                "transition-all duration-300",
                isScrolled 
                  ? "shadow-lg shadow-primary/20 hover:shadow-primary/30"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              )}
            >
              Get Started
            </Button>
          </motion.div>

          {/* Mobile menu button */}
          <button className={cn(
            "md:hidden relative z-10 p-2 rounded-lg transition-colors duration-300",
            isScrolled 
              ? "bg-gray-100/80 text-gray-600 hover:text-gray-900 hover:bg-gray-200/80"
              : "bg-white/10 text-white hover:bg-white/20"
          )}>
            <span className="sr-only">Open menu</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </motion.nav>
      </div>
    </motion.header>
  );
}; 