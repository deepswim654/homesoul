'use client';

import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '7xl' | 'full';
  noPadding?: boolean;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '7xl': 'max-w-7xl',
  'full': 'w-full',
};

export const PageLayout: FC<PageLayoutProps> = ({
  children,
  className,
  maxWidth = '7xl',
  noPadding = false,
}) => {
  return (
    <div className={cn(
      'min-h-[calc(100vh-5rem)]',
      'bg-gray-50',
      !noPadding && 'py-6',
      'mt-16'
    )}>
      <div className={cn(
        maxWidthClasses[maxWidth],
        maxWidth !== 'full' && 'mx-auto px-4 sm:px-6 lg:px-8'
      )}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={className}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}; 