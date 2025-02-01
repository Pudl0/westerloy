'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function DashboardHeader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const smoothScroll = (e: Event) => {
      e.preventDefault();
      const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      if (targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener('click', smoothScroll);
    });

    setIsLoaded(true);

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', smoothScroll);
      });
    };
  }, []);

  return (
    <div className="relative mx-auto overflow-hidden rounded-xl shadow-2xl lg:w-5/6">
      <Image
        src="/Muehlenhof.jpg"
        alt="Westerloy landscape"
        width={1200}
        height={600}
        className="absolute inset-0 h-full w-full object-cover"
        priority
      />
      <div className="relative z-10 bg-gradient-to-b from-westerloyPrimary/60 to-westerloyPrimary/40 px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-shadow-lg text-center text-4xl font-extrabold tracking-tight text-westerloyBackground sm:text-5xl lg:text-6xl">
            Herzlich Willkommen in Westerloy
          </h1>
          <p className="text-shadow-md mx-auto mt-6 max-w-lg text-center text-xl text-westerloyBackground sm:max-w-3xl">
            Entdecken Sie die Schönheit und Gemeinschaft unseres charmanten Dorfes
          </p>
        </motion.div>
        <motion.div
          className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
            <a
              href="#eventdashboard"
              className="flex items-center justify-center rounded-md border-2 border-westerloyBackground bg-westerloyBackground px-4 py-3 text-base font-medium text-westerloyPrimary shadow-sm transition duration-300 ease-in-out hover:bg-westerloyBackground/90 hover:text-westerloyPrimary focus:outline-none focus:ring-2 focus:ring-westerloyAccent focus:ring-offset-2 sm:px-8"
            >
              Veranstaltungen
            </a>
            <a
              href="dorfgeschehen/neuigkeiten"
              className="flex items-center justify-center rounded-md border-2 border-westerloyBackground bg-westerloySecondary/80 px-4 py-3 text-base font-medium text-westerloyBackground shadow-sm transition duration-300 ease-in-out hover:bg-westerloySecondary focus:outline-none focus:ring-2 focus:ring-westerloyAccent focus:ring-offset-2 sm:px-8"
            >
              Neuigkeiten
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
