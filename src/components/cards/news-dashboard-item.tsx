'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { MuehlenhofIcon } from '@/components/muehelnhof-icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { NewsEntry } from '@/lib/types/news-entry';

type NewsDashboardItemProps = {
  newsentry: NewsEntry;
};

export default function NewsDashboardItem({ newsentry }: NewsDashboardItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const truncateText = (text: string, lines = 3) => {
    const words = text.split(' ');
    const truncated = words.slice(0, lines * 10).join(' ');
    return truncated.length < text.length ? `${truncated}...` : truncated;
  };

  return (
    <>
      <Card className="flex h-full flex-col bg-westerloyBackground shadow-md transition-shadow hover:shadow-lg">
        <CardHeader className="p-0">
          {!imageError ? (
            <Image
              src={newsentry.Picture || '/placeholder.svg'}
              alt={newsentry.Title}
              width={400}
              height={200}
              className="h-48 w-full rounded-t-lg object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-48 w-full items-center justify-center rounded-t-lg bg-westerloySecondary/20">
              <MuehlenhofIcon className="h-32 w-32 text-westerloyPrimary/40" />
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="mb-2 text-lg text-westerloyPrimary">{newsentry.Title}</CardTitle>
          <p className="mt-2 line-clamp-3 text-sm text-westerloyPrimary/80">
            {truncateText(newsentry.ShortDescription)}
          </p>
        </CardContent>
        <CardFooter className="flex justify-end p-4">
          <Button
            size="sm"
            onClick={openModal}
            className="bg-westerloyPrimary text-westerloyBackground hover:bg-westerloyPrimary/90"
          >
            Mehr lesen
          </Button>
        </CardFooter>
      </Card>

      <AnimatePresence>
        {isModalOpen && (
          <Dialog open={isModalOpen} onOpenChange={closeModal}>
            <DialogContent
              className="flex flex-col overflow-hidden bg-westerloyBackground p-0"
              style={{
                width: isMobile ? '100%' : '90vw',
                height: isMobile ? '100%' : '90vh',
                maxWidth: '1000px',
                maxHeight: '800px',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="flex h-full flex-col overflow-hidden"
              >
                <DialogHeader className="sticky top-0 z-10 bg-westerloyBackground p-4 shadow-md">
                  <div className="flex items-center justify-between">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={closeModal}
                      className="mr-2 text-westerloyPrimary hover:bg-westerloySecondary/10"
                    >
                      <ChevronLeft className="h-6 w-6" />
                      <span className="sr-only">Zurück</span>
                    </Button>
                    <DialogTitle className="flex-grow text-center text-xl font-bold text-westerloyPrimary">
                      {newsentry.Title}
                    </DialogTitle>
                    <div className="w-8" /> {/* Spacer for alignment */}
                  </div>
                </DialogHeader>
                <div ref={contentRef} className="flex-grow overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="mx-auto max-w-3xl">
                    <div className="relative mb-6 h-48 w-full sm:h-64">
                      {!imageError ? (
                        <Image
                          src={newsentry.Picture || '/placeholder.svg'}
                          alt={newsentry.Title}
                          sizes="(max-width: 1000px) 100vw, 1000px"
                          fill
                          className="rounded-lg object-cover"
                          onError={() => setImageError(true)}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-lg bg-westerloySecondary/20">
                          <MuehlenhofIcon className="h-32 w-32 text-westerloyPrimary/40" />
                        </div>
                      )}
                    </div>
                    <p className="text-base leading-relaxed text-westerloyPrimary sm:text-lg">
                      {newsentry.Description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
