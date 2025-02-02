'use client';

import { motion } from 'framer-motion';
import type { FC } from 'react';

interface DashboardDividerProps {
  title: string;
}

const DashboardDivider: FC<DashboardDividerProps> = ({ title }) => {
  return (
    <motion.div
      className="my-8 flex items-center justify-center px-4 sm:my-12 sm:px-6 md:my-16 md:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="hidden flex-grow border-t-2 border-westerloySecondary/30 sm:block"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.h2 className="mx-4 flex-shrink-0 rounded-full bg-gradient-to-r from-westerloyPrimary to-westerloySecondary px-4 py-2 text-sm font-bold uppercase tracking-wider text-westerloyBackground shadow-lg transition-all duration-300 ease-in-out sm:mx-6 sm:px-6 sm:py-3 sm:text-base md:mx-8 md:px-8 md:py-4 md:text-lg lg:text-xl">
        {title}
      </motion.h2>
      <motion.div
        className="hidden flex-grow border-t-2 border-westerloySecondary/30 sm:block"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
    </motion.div>
  );
};

export default DashboardDivider;
