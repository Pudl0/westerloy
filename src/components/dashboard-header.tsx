'use client';

import Image from 'next/image';
import { useEffect } from 'react';

export default function DashboardHeader() {
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

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', smoothScroll);
      });
    };
  }, []);

  return (
    <>
      <div className="relative mx-auto overflow-hidden rounded-xl lg:w-3/4">
        <Image
          src="/Muehlenhof.jpg"
          alt="Westerloy landscape"
          width={800}
          height={400}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-10 bg-black bg-opacity-60 px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Herzlich Willkommen in Westerloy
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-center text-xl text-gray-200 sm:max-w-3xl">
            Entdecken Sie die Schönheit und Gemeinschaft unseres charmanten Dorfes
          </p>
          <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
            <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
              <a
                href="#eventdashboard"
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-gray-900 shadow-sm transition duration-150 ease-in-out hover:bg-gray-100 sm:px-8"
              >
                Veranstaltungen
              </a>
              <a
                href="dorfgeschehen/neuigkeiten"
                className="flex items-center justify-center rounded-md border border-transparent bg-white bg-opacity-20 px-4 py-3 text-base font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-opacity-30 sm:px-8"
              >
                Neuigkeiten
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
