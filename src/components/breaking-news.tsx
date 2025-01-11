import { InfoIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

interface BreakingNewsItem {
  id: string;
  content: string;
}

interface BreakingNewsProps {
  news: BreakingNewsItem[];
}

export default function BreakingNews({ news }: BreakingNewsProps) {
  if (news.length === 0) {
    return (
      <Card className="bg-gray-100">
        <CardContent className="flex items-center justify-center p-6">
          <InfoIcon className="mr-2 h-5 w-5 text-gray-400" />
          <p className="text-gray-600">Zurzeit gibt es keine Eilmeldungen.</p>
        </CardContent>
      </Card>
    );
  }

  const gridCols =
    news.length === 1 ? 'grid-cols-1' : news.length === 2 ? 'grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3';
  const cardSize = news.length <= 2 ? 'max-w-2xl mx-auto' : 'w-full';

  return (
    <div className={`grid gap-4 ${gridCols} ${news.length <= 2 ? 'justify-center' : ''}`}>
      {news.map((item) => (
        <Card key={item.id} className={`bg-red-100 ${cardSize}`}>
          <CardContent className="flex items-center p-6">
            <InfoIcon className="mr-2 h-5 w-5 text-red-500" />
            <p className="text-red-700">{item.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
