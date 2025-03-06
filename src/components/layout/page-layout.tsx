import Image from 'next/image';
import type { ReactNode } from 'react';

import BackToDashboardButton from '@/components/back-to-dashboard-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface PageContent {
  title: string;
  headerImage: string;
  headerImageAlt?: string;
  paragraphs?: string[];
  metadata?: Array<{
    icon: ReactNode;
    text: string;
  }>;
  actions?: ReactNode;
}

export interface PageLayoutProps {
  content: PageContent;
  children?: ReactNode;
}

export default function PageLayout({ content, children }: PageLayoutProps) {
  const { title, headerImage, headerImageAlt = 'Header Image', paragraphs = [], metadata = [], actions } = content;

  return (
    <div className="container mx-auto bg-westerloyBackground px-4 py-8">
      <BackToDashboardButton />
      <Card className="mt-8 overflow-hidden bg-westerloyBackground shadow-lg">
        <div className="relative h-[400px] w-full">
          <Image
            src={headerImage || '/placeholder.svg'}
            layout="fill"
            objectFit="cover"
            alt={headerImageAlt}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-westerloyPrimary/80 to-transparent" />
          <CardHeader className="absolute bottom-0 left-0 right-0 z-10">
            <CardTitle className="text-4xl font-bold text-westerloyBackground">{title}</CardTitle>
          </CardHeader>
        </div>
        <CardContent className="mt-6 space-y-6">
          {metadata.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 text-westerloyPrimary">
              {metadata.map((item, index) => (
                <div key={index} className="flex items-center">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          )}

          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed text-westerloyPrimary">
              {paragraph}
            </p>
          ))}

          {children}

          {actions && <div className="pt-8">{actions}</div>}
        </CardContent>
      </Card>
    </div>
  );
}
