import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';

import '@/app/globals.css';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/ui/footer';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Westerloy',
  description: 'OBV Westerloy',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="h-full">
      <body className={`${inter.className} flex min-h-full flex-col bg-westerloyBackground text-westerloyPrimary`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
