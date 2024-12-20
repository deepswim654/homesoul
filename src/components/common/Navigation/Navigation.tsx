'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { NAV_ITEMS } from '@/constants/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, User, LogOut, Crown } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { useAuth } from '@/lib/contexts/AuthContext';

type NavItem = {
  readonly label: string;
  readonly href?: string;
  readonly children?: ReadonlyArray<{
    readonly href: string;
    readonly label: string;
  }>;
};

export const Navigation: FC = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
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
          "absolute inset-0 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm",
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
              <OptimizedImage
                src="/assets/logos/logo.svg"
                alt="HomeSoul Logo"
                width={180}
                height={72}
                className="w-44 h-16"
                priority
                usePlaceholder={false}
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
                      "relative px-4 py-2 text-[15px] font-medium tracking-wide text-gray-700 hover:text-gray-900 transition-colors duration-300",
                      pathname === item.href && "text-primary font-semibold"
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className="flex items-center px-4 py-2 text-[15px] font-medium tracking-wide text-gray-700 hover:text-gray-900 transition-colors duration-300"
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
                  <div className="absolute top-full left-0 w-64 pt-2">
                    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg ring-1 ring-black/5 overflow-hidden">
                      <div className="py-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href || ''}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50/80 transition-colors duration-200"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons or User Menu */}
          <motion.div 
            className="hidden md:flex items-center space-x-4"
            style={{ scale }}
          >
            {user ? (
              <div className="relative group">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'user' ? null : 'user')}
                  className="flex items-center space-x-2 px-4 py-2 text-[15px] font-medium tracking-wide text-gray-700 hover:text-gray-900 transition-colors duration-300 rounded-full hover:bg-gray-50/80"
                >
                  <span>{user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {openDropdown === 'user' && (
                  <div className="absolute right-0 mt-2 w-56 pt-2">
                    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg ring-1 ring-black/5 overflow-hidden">
                      <div className="p-1.5">
                        <Link
                          href="/membership"
                          className="flex items-center w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50/80 rounded-lg transition-colors duration-200"
                        >
                          <Crown className="h-4 w-4 mr-2 text-primary" />
                          <div>
                            <span className="font-medium">Membership</span>
                            <p className="text-xs text-gray-500 mt-0.5">View your benefits & rewards</p>
                          </div>
                        </Link>
                        <Link
                          href="/profile"
                          className="flex items-center w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50/80 rounded-lg transition-colors duration-200"
                        >
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          <div>
                            <span className="font-medium">Profile</span>
                            <p className="text-xs text-gray-500 mt-0.5">Manage your account</p>
                          </div>
                        </Link>
                        <button
                          onClick={logout}
                          className="flex items-center w-full px-3 py-2.5 text-sm text-red-600 hover:bg-red-50/80 rounded-lg transition-colors duration-200"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          <div>
                            <span className="font-medium">Log out</span>
                            <p className="text-xs text-red-400 mt-0.5">Sign out of your account</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button 
                    variant="secondary"
                    size="sm"
                    className="text-gray-700 hover:text-gray-900 font-medium"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="shadow-lg shadow-primary/20 hover:shadow-primary/30 font-medium"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </motion.div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-10 p-2 rounded-lg bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors duration-300"
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
              className="md:hidden bg-white/80 backdrop-blur-md rounded-xl mt-2 shadow-lg ring-1 ring-black/5"
            >
              <div className="p-4 space-y-1">
                {NAV_ITEMS.map((item, index) => (
                  <div key={`mobile-${index}`}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-4 py-2.5 text-[15px] font-medium tracking-wide text-gray-700 hover:text-gray-900 hover:bg-gray-50/80 rounded-lg transition-colors duration-200",
                          pathname === item.href && "text-primary bg-primary/5"
                        )}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                          className="flex items-center justify-between w-full px-4 py-2.5 text-[15px] font-medium tracking-wide text-gray-700 hover:text-gray-900 hover:bg-gray-50/80 rounded-lg transition-colors duration-200"
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
                          <div className="pl-4 mt-1 space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-lg transition-colors duration-200"
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
                
                {/* Mobile User Menu */}
                {user ? (
                  <div className="border-t border-gray-100 pt-4 mt-4 space-y-1">
                    <Link
                      href="/membership"
                      className="flex items-center px-4 py-2.5 text-[15px] font-medium tracking-wide text-gray-700 hover:text-gray-900 hover:bg-gray-50/80 rounded-lg transition-colors duration-200"
                    >
                      <Crown className="h-5 w-5 mr-2 text-primary" />
                      Membership
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2.5 text-[15px] font-medium tracking-wide text-gray-700 hover:text-gray-900 hover:bg-gray-50/80 rounded-lg transition-colors duration-200"
                    >
                      <User className="h-5 w-5 mr-2 text-gray-500" />
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2.5 text-[15px] font-medium tracking-wide text-red-600 hover:bg-red-50/80 rounded-lg transition-colors duration-200"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Log out
                    </button>
                  </div>
                ) : (
                  <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
                    <Link
                      href="/auth/login"
                      className="block px-4 py-2.5 text-[15px] font-medium tracking-wide text-gray-700 hover:text-gray-900 hover:bg-gray-50/80 rounded-lg transition-colors duration-200"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block px-4 py-2.5 text-[15px] font-medium tracking-wide text-primary hover:text-primary-dark hover:bg-primary/5 rounded-lg transition-colors duration-200"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}; 