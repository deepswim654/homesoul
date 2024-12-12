'use client';

import { FC } from 'react';
import Link from 'next/link';
import { FOOTER_LINKS } from '@/constants/navigation';
import { siteConfig } from '@/config/site';
import { FooterSection } from '@/types/features';

export const Footer: FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-gray-900 text-lg font-bold mb-4">{siteConfig.name}</h2>
            <p className="text-sm text-gray-500 mb-4">
              Smart living for a sustainable future.
            </p>
          </div>

          {/* Footer Links */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h3 className="text-gray-900 font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 mt-12 pt-8 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}; 