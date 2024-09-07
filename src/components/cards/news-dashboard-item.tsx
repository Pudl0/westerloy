'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { NewsEntry } from '@/lib/types/news-entry';

export default function NewsDashboardItem({ newsentry }: { newsentry: NewsEntry }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const togglePreview = () => setIsPreviewOpen(!isPreviewOpen);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="p-0">
        <Image
          src={newsentry.pictureLink}
          alt={newsentry.title}
          width={400}
          height={200}
          className="h-48 w-full rounded-t-lg object-cover"
        />
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="mb-2 text-lg">{newsentry.title}</CardTitle>
        {isPreviewOpen && <p className="mt-2 text-sm text-gray-700">{newsentry.description.slice(0, 100)}...</p>}
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <Button variant="outline" size="sm" onClick={togglePreview}>
          {isPreviewOpen ? 'Vorschau schließen' : 'Vorschau'}
        </Button>
        <Link href={`/news/${newsentry.id}`} passHref>
          <Button size="sm">Mehr lesen</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
