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
          "absolute inset-0 transition-all duration-300 bg-white/70 backdrop-blur-xl border-b border-gray-100/50 shadow-sm",
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
          <div className="hidden md:flex items-center space-x-3">
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
                      "relative px-5 py-2.5 text-[16px] font-medium tracking-tight text-gray-600 hover:text-gray-900 rounded-full transition-all duration-300 hover:bg-gray-50/80",
                      pathname === item.href && "text-primary font-semibold bg-primary/5"
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className="flex items-center px-5 py-2.5 text-[16px] font-medium tracking-tight text-gray-600 hover:text-gray-900 rounded-full transition-all duration-300 hover:bg-gray-50/80"
                  >
                    {item.label}
                    <ChevronDown className="ml-1.5 h-4 w-4" />
                  </button>
                )}

                {/* Dropdown Menu */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 w-64 pt-2">
                    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg ring-1 ring-black/5 overflow-hidden border border-gray-100/50">
                      <div className="py-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href || ''}
                            className="block px-5 py-3 text-[15px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 transition-all duration-200"
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
                  className="flex items-center space-x-2 px-5 py-2.5 text-[16px] font-medium tracking-tight text-gray-600 hover:text-gray-900 transition-all duration-300 rounded-full hover:bg-gray-50/80"
                >
                  <span>{user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {openDropdown === 'user' && (
                  <div className="absolute right-0 mt-2 w-64 pt-2">
                    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg ring-1 ring-black/5 overflow-hidden border border-gray-100/50">
                      <div className="p-2">
                        <Link
                          href="/membership"
                          className="flex items-center w-full px-4 py-3 text-[15px] text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-xl transition-all duration-200"
                        >
                          <Crown className="h-4 w-4 mr-3 text-primary" />
                          <div>
                            <span className="font-semibold">Membership</span>
                            <p className="text-[13px] text-gray-500 mt-0.5">View your benefits & rewards</p>
                          </div>
                        </Link>
                        <Link
                          href="/profile"
                          className="flex items-center w-full px-4 py-3 text-[15px] text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-xl transition-all duration-200"
                        >
                          <User className="h-4 w-4 mr-3 text-gray-500" />
                          <div>
                            <span className="font-semibold">Profile</span>
                            <p className="text-[13px] text-gray-500 mt-0.5">Manage your account</p>
                          </div>
                        </Link>
                        <button
                          onClick={logout}
                          className="flex items-center w-full px-4 py-3 text-[15px] text-red-500 hover:text-red-600 hover:bg-red-50/80 rounded-xl transition-all duration-200"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          <div>
                            <span className="font-semibold">Log out</span>
                            <p className="text-[13px] text-red-400 mt-0.5">Sign out of your account</p>
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
                    className="text-gray-600 hover:text-gray-900 font-medium px-6 text-[15px]"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="shadow-lg shadow-primary/20 hover:shadow-primary/30 font-semibold px-6 text-[15px]"
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
            className="md:hidden relative z-10 p-2 rounded-xl bg-gray-100/80 text-gray-600 hover:text-gray-900 hover:bg-gray-200/80 transition-all duration-300"
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
              className="md:hidden bg-white/70 backdrop-blur-xl rounded-2xl mt-2 shadow-lg ring-1 ring-black/5 border border-gray-100/50"
            >
              <div className="p-4 space-y-1">
                {NAV_ITEMS.map((item, index) => (
                  <div key={`mobile-${index}`}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-4 py-2.5 text-[16px] font-medium tracking-tight text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-xl transition-all duration-200",
                          pathname === item.href && "text-primary bg-primary/5"
                        )}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                          className="flex items-center justify-between w-full px-4 py-2.5 text-[16px] font-medium tracking-tight text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-xl transition-all duration-200"
                        >
                          {item.label}
                          <ChevronDown 
                            className={cn(
                              "ml-1.5 h-4 w-4 transition-transform duration-200",
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
                                className="block px-4 py-2.5 text-[15px] text-gray-500 hover:text-gray-900 hover:bg-gray-50/80 rounded-xl transition-all duration-200"
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
                  <div className="border-t border-gray-100/50 pt-4 mt-4 space-y-1">
                    <Link
                      href="/membership"
                      className="flex items-center px-4 py-2.5 text-[16px] font-medium tracking-tight text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-xl transition-all duration-200"
                    >
                      <Crown className="h-5 w-5 mr-3 text-primary" />
                      Membership
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2.5 text-[16px] font-medium tracking-tight text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-xl transition-all duration-200"
                    >
                      <User className="h-5 w-5 mr-3 text-gray-500" />
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2.5 text-[16px] font-medium tracking-tight text-red-500 hover:text-red-600 hover:bg-red-50/80 rounded-xl transition-all duration-200"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Log out
                    </button>
                  </div>
                ) : (
                  <div className="border-t border-gray-100/50 pt-4 mt-4 space-y-2">
                    <Link
                      href="/auth/login"
                      className="block px-4 py-2.5 text-[16px] font-medium tracking-tight text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-xl transition-all duration-200"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block px-4 py-2.5 text-[16px] font-medium tracking-tight text-primary hover:text-primary-dark hover:bg-primary/5 rounded-xl transition-all duration-200"
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