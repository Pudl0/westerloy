import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import Footer from '../components/ui/footer';
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });
inter.className +=  ' mb-10';

export const metadata: Metadata = {
  title: 'Westerloy',
  description: 'OBV Westerloy',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
