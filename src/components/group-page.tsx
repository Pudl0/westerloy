import { Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';

import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GroupPageProps {
  title: string;
  imageSrc: string;
  content: string[];
  facebookUrl?: string;
  instagramUrl?: string;
}

export default function GroupPage({ title, imageSrc, content, facebookUrl, instagramUrl }: GroupPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <BackToDashboardButton />
      <Card className="mt-8 overflow-hidden">
        <div className="relative h-[400px] w-full">
          <Image src={imageSrc} layout="fill" objectFit="cover" alt={title} priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <CardHeader className="absolute bottom-0 left-0 right-0 z-10">
            <CardTitle className="text-4xl font-bold text-white">{title}</CardTitle>
          </CardHeader>
        </div>
        <CardContent className="mt-6 space-y-6">
          {content.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed text-gray-700">
              {paragraph}
            </p>
          ))}
          {(facebookUrl || instagramUrl) && (
            <div className="flex items-center justify-center space-x-6 pt-8">
              {facebookUrl && (
                <Button
                  variant="default"
                  size="lg"
                  className="transform rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
                  asChild
                >
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <Facebook className="h-6 w-6" />
                    <span>Facebook</span>
                  </a>
                </Button>
              )}
              {instagramUrl && (
                <Button
                  variant="default"
                  size="lg"
                  className="transform rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:from-purple-600 hover:to-pink-600 hover:shadow-xl"
                  asChild
                >
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <Instagram className="h-6 w-6" />
                    <span>Instagram</span>
                  </a>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
