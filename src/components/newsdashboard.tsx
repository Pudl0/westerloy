import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Suspense } from 'react';

import NewsDashboardItem from '@/components/cards/news-dashboard-item';
import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { NewsEntry } from '@/lib/types/news-entry';

const API_URL = process.env.STRAPI_PUBLIC_API_URL;

async function fetchNews(): Promise<NewsEntry[]> {
  const username = process.env.STRAPI_USERNAME;
  const password = process.env.STRAPI_PASSWORD;

  if (!username || !password) {
    console.error('Strapi credentials are not set');
    return [];
  }

  try {
    const authResponse = await fetch(`${API_URL}/api/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: username, password: password }),
    });

    if (!authResponse.ok) {
      throw new Error('Authentication failed');
    }

    const authData = await authResponse.json();

    const newsResponse = await fetch(`${API_URL}/api/news-entries?populate=*`, {
      headers: { Authorization: `Bearer ${authData.jwt}` },
    });

    if (!newsResponse.ok) {
      throw new Error('Failed to fetch news');
    }

    const newsData = await newsResponse.json();

    return newsData.data.map((item: any): NewsEntry => {
      return {
        Id: item.id,
        attributes: {
          Title: item.Title || 'Kein Titel',
          ShortDescription: item.ShortDescription || 'Keine Kurzbeschreibung',
          Description: item.Description || 'Keine Beschreibung',
          Picture: API_URL + item.Picture.url,
        },
      };
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export default async function NewsDashboard() {
  const news = await fetchNews();

  return (
    <Suspense fallback={<NewsDashboardSkeleton />}>
      <NewsList news={news} />
    </Suspense>
  );
}

function NewsList({ news }: { news: NewsEntry[] }) {
  if (news.length === 0) {
    return <div className="text-center text-gray-600">Keine Neuigkeiten verfügbar.</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <BackToDashboardButton className="mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">Aktuelle Neuigkeiten</h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((newsEntry) => (
          <NewsDashboardItem newsentry={newsEntry} />
        ))}
      </div>

      {news.length > 6 && <Pagination totalItems={news.length} itemsPerPage={6} />}
    </main>
  );
}

function Pagination({ totalItems, itemsPerPage }: { totalItems: number; itemsPerPage: number }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <nav className="mt-8 flex items-center justify-center space-x-4" aria-label="Pagination">
      <Button
        onClick={() => {
          /* Implement previous page logic */
        }}
        disabled={true /* Adjust based on current page */}
        variant="outline"
        aria-label="Vorherige Seite"
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Vorherige
      </Button>
      <span className="text-sm text-gray-600">Seite 1 von {totalPages}</span>
      <Button
        onClick={() => {
          /* Implement next page logic */
        }}
        disabled={false /* Adjust based on current page */}
        variant="outline"
        aria-label="Nächste Seite"
      >
        Nächste <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </nav>
  );
}

function NewsDashboardSkeleton() {
  return (
    <div className="space-y-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-full space-y-2">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
