'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { NAV_ITEMS } from '@/constants/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import Image from 'next/image';

type NavItem = {
  readonly label: string;
  readonly href?: string;
  readonly children?: ReadonlyArray<{
    readonly href: string;
    readonly label: string;
  }>;
};

export const Navigation: FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const handleDropdown = (item: NavItem) => {
    if (item.children) {
      setOpenDropdown(item.label);
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      suppressHydrationWarning
    >
      <motion.div 
        className={cn(
          "absolute inset-0 transition-all duration-300 bg-white border-b border-gray-100 shadow",
        )}
        style={{ opacity: headerBackgroundOpacity }}
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
              className="relative flex items-center"
            >
              <Image
                src="/assets/logos/logo.svg"
                alt="HomeSoul Logo"
                width={180}
                height={72}
                className="w-44 h-16"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item: NavItem, index) => (
              <div
                key={`nav-item-${index}`}
                className="relative group"
                onMouseEnter={() => handleDropdown(item)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "relative px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-300",
                      pathname === item.href && "text-gray-900"
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-300"
                  >
                    {item.label}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                )}

                {/* Invisible bridge to prevent gap */}
                {item.children && (
                  <div className="absolute -bottom-2 left-0 right-0 h-2 bg-transparent" />
                )}

                {/* Dropdown Menu */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-lg">
                    <div className="py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href || ''}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div 
            className="hidden md:flex items-center space-x-4"
            style={{ scale }}
          >
            <Link href="/auth/login">
              <Button 
                variant="secondary"
                size="sm"
                className="text-gray-700 hover:text-gray-900"
              >
                Log in
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button 
                variant="primary" 
                size="sm"
                className="shadow-lg shadow-primary/20 hover:shadow-primary/30"
              >
                Get Started
              </Button>
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "md:hidden relative z-10 p-2 rounded-lg transition-colors duration-300",
              isScrolled 
                ? "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                : "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            )}
          >
            <span className="sr-only">
              {isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            </span>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </motion.nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white"
            >
              <div className="py-4 space-y-1">
                {NAV_ITEMS.map((item, index) => (
                  <div key={`mobile-${index}`}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                          pathname === item.href && "text-gray-900 bg-gray-50"
                        )}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                          className="flex items-center justify-between w-full px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        >
                          {item.label}
                          <ChevronDown 
                            className={cn(
                              "ml-1 h-4 w-4 transition-transform duration-200",
                              openDropdown === item.label && "transform rotate-180"
                            )}
                          />
                        </button>
                        {item.children && openDropdown === item.label && (
                          <div className="pl-4 space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
                <div className="px-4 pt-4 pb-2 space-y-2">
                  <Link href="/auth/login" className="block w-full">
                    <Button 
                      variant="secondary"
                      size="sm"
                      className="w-full text-gray-700 hover:text-gray-900"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link href="/auth/signup" className="block w-full">
                    <Button 
                      variant="primary" 
                      size="sm"
                      className="w-full shadow-lg shadow-primary/20 hover:shadow-primary/30"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}; 