'use client';

import { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Home } from 'lucide-react';

const NotFoundPage: FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-bold text-gray-900">Page not found</h2>
          <p className="text-gray-600">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <div className="mt-8">
            <Link href="/">
              <Button variant="primary" className="inline-flex items-center space-x-2">
                <Home className="w-5 h-5" />
                <span>Back to home</span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage; 