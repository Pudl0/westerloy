'use client';

import Image from 'next/image';
import { useState } from 'react';

import { MuehlenhofIcon } from '@/components/muehelnhof-icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { NewsEntry } from '@/lib/types/news-entry';

type NewsDashboardItemProps = {
  newsentry: NewsEntry;
  onReadMore: (entry: NewsEntry) => void;
};

export default function NewsDashboardItem({ newsentry, onReadMore }: NewsDashboardItemProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const togglePreview = () => setIsPreviewOpen(!isPreviewOpen);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="p-0">
        {!imageError ? (
          <Image
            src={newsentry.pictureLink}
            alt={newsentry.title}
            width={400}
            height={200}
            className="h-48 w-full rounded-t-lg object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center rounded-t-lg bg-gray-200">
            <MuehlenhofIcon />
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="mb-2 text-lg">{newsentry.title}</CardTitle>
        {isPreviewOpen && <p className="mt-2 text-sm text-gray-700">{newsentry.description.slice(0, 100)}...</p>}
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <Button variant="outline" size="sm" onClick={togglePreview}>
          {isPreviewOpen ? 'Vorschau schließen' : 'Vorschau'}
        </Button>
        <Button size="sm" onClick={() => onReadMore(newsentry)}>
          Mehr lesen
        </Button>
      </CardFooter>
    </Card>
  );
}
