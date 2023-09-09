import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import Footer from '../components/ui/footer';
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
        {/* <header>Header here</header> */}
        <main>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
