'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import { useState } from 'react';

import { MuehlenhofIcon } from '@/components/muehelnhof-icon';
import { type NavGroup, navGroups } from '@/components/navbar/navgroups';
import { cn } from '@/lib/utils/utils';

const DropdownMenu: React.FC<{ group: NavGroup }> = ({ group }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button
        className="flex items-center space-x-2 rounded-md px-4 py-3 text-base font-medium text-westerloyPrimary transition-colors duration-200 hover:bg-westerloySecondary/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{group.title}</span>
        <ChevronDown className={cn('h-5 w-5 transition-transform duration-200', isOpen ? 'rotate-180' : '')} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 rounded-md bg-westerloyBackground shadow-lg ring-1 ring-westerloySecondary ring-opacity-5 focus:outline-none"
          >
            <div className="py-2">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-base text-westerloyPrimary hover:bg-westerloySecondary/10"
                >
                  <item.icon className="mr-3 h-6 w-6 text-westerloySecondary" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-y-0 right-0 z-50 w-72 bg-westerloyBackground shadow-lg"
        >
          <div className="p-6">
            <button onClick={onClose} className="mb-6 text-westerloySecondary hover:text-westerloyPrimary">
              <X className="h-8 w-8" />
            </button>
            {navGroups.map((group) => (
              <div key={group.title} className="mb-6">
                <h3 className="mb-3 text-lg font-semibold uppercase tracking-wider text-westerloySecondary">
                  {group.title}
                </h3>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center rounded-md px-4 py-3 text-base text-westerloyPrimary hover:bg-westerloySecondary/10"
                    onClick={onClose}
                  >
                    <item.icon className="mr-3 h-6 w-6 text-westerloySecondary" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-westerloyBackground shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex-shrink-0">
            <MuehlenhofIcon className="transition-transform duration-300 ease-in-out hover:scale-105" />
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-8 lg:pr-4">
            {navGroups.map((group) => (
              <DropdownMenu key={group.title} group={group} />
            ))}
          </div>
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-md p-2 text-westerloySecondary hover:bg-westerloySecondary/10 hover:text-westerloyPrimary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-westerloyAccent"
              aria-label="Open main menu"
            >
              <Menu className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </nav>
  );
};

export default Navbar;
