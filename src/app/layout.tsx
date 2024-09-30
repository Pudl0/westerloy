import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';

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
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <main className="">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
