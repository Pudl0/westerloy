'use client';

import Image from 'next/image';
import { useState } from 'react';

import { MuehlenhofIcon } from '@/components/muehelnhof-icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { NewsEntry } from '@/lib/types/news-entry';

type NewsDashboardItemProps = {
  newsentry: NewsEntry;
};

export default function NewsDashboardItem({ newsentry }: NewsDashboardItemProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const togglePreview = () => setIsPreviewOpen(!isPreviewOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Card className="flex h-full flex-col">
        <CardHeader className="p-0">
          {!imageError ? (
            <Image
              src={newsentry.attributes.Picture}
              alt={newsentry.attributes.Title}
              width={400}
              height={200}
              className="h-48 w-full rounded-t-lg object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-48 w-full items-center justify-center rounded-t-lg bg-gray-200">
              <MuehlenhofIcon className="h-32 w-32 text-gray-400" />
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="mb-2 text-lg">{newsentry.attributes.Title}</CardTitle>
          {isPreviewOpen && <p className="mt-2 text-sm text-gray-700">{newsentry.attributes.ShortDescription}</p>}
        </CardContent>
        <CardFooter className="flex justify-between p-4">
          <Button variant="outline" size="sm" onClick={togglePreview}>
            {isPreviewOpen ? 'Vorschau schließen' : 'Vorschau'}
          </Button>
          <Button size="sm" onClick={openModal}>
            Mehr lesen
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">{newsentry.attributes.Title}</DialogTitle>
          </DialogHeader>
          <div className="mt-6">
            <div className="relative mb-6 h-80 w-full">
              {!imageError ? (
                <Image
                  src={newsentry.attributes.Picture}
                  alt={newsentry.attributes.Title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-200">
                  <MuehlenhofIcon className="h-32 w-32 text-gray-400" />
                </div>
              )}
            </div>
            <p className="text-lg leading-relaxed text-gray-700">{newsentry.attributes.Description}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
