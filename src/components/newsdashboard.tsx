'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import NewsDashboardItem from '@/components/cards/news-dashboard-item';
import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';
import { Button } from '@/components/ui/button';
import type { NewsEntry } from '@/lib/types/news-entry';

export function NewsDashboard({ news }: { news: NewsEntry[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(news.length / itemsPerPage);

  if (news.length === 0) {
    return <div className="text-center text-gray-600">Keine Neuigkeiten verfügbar.</div>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = news.slice(startIndex, endIndex);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <BackToDashboardButton className="mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">Aktuelle Neuigkeiten</h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentNews.map((newsEntry, index) => (
          <NewsDashboardItem key={index} newsentry={newsEntry} />
        ))}
      </div>

      {news.length > itemsPerPage && (
        <nav className="mt-8 flex items-center justify-center space-x-4" aria-label="Pagination">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
            aria-label="Vorherige Seite"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Vorherige
          </Button>
          <span className="text-sm text-gray-600">
            Seite {currentPage} von {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant="outline"
            aria-label="Nächste Seite"
          >
            Nächste <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </nav>
      )}
    </main>
  );
}
