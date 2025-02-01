'use client';

import { motion } from 'framer-motion';
import type { FC } from 'react';

interface DashboardDividerProps {
  title: string;
}

const DashboardDivider: FC<DashboardDividerProps> = ({ title }) => {
  return (
    <motion.div
      className="mx-auto my-16 flex max-w-5xl items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex-grow border-t-2 border-westerloySecondary/30"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.h2 className="mx-8 flex-shrink-0 rounded-full bg-gradient-to-r from-westerloyPrimary to-westerloySecondary px-8 py-4 text-lg font-bold uppercase tracking-wider text-westerloyBackground shadow-lg transition-all duration-300 ease-in-out lg:text-xl">
        {title}
      </motion.h2>
      <motion.div
        className="flex-grow border-t-2 border-westerloySecondary/30"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
    </motion.div>
  );
};

export default DashboardDivider;
