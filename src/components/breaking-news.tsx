import { AlertTriangle } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

type NewsItem = {
  id: string;
  content: string;
};

type BreakingNewsProps = {
  news: NewsItem[];
};

export default function BreakingNews({ news }: BreakingNewsProps) {
  const gridCols =
    news.length === 1 ? 'grid-cols-1' : news.length === 2 ? 'grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3';
  const cardSize = news.length <= 2 ? 'max-w-2xl mx-auto' : 'w-full';

  return (
    <section
      aria-label="Breaking News"
      className={`grid gap-4 ${gridCols} ${news.length <= 2 ? 'justify-center' : ''}`}
    >
      {news.map((item) => (
        <Card key={item.id} className={`bg-destructive/10 ${cardSize}`}>
          <CardContent className="flex items-center gap-3 p-6">
            <AlertTriangle className="h-6 w-6 flex-shrink-0 text-destructive" aria-hidden="true" />
            <p className="text-base font-medium text-destructive">{item.content}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
