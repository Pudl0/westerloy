'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import NewsDashboardItem from '@/components/cards/news-dashboard-item';
import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';
import { Button } from '@/components/ui/button';
import { NewsEntry } from '@/lib/types/news-entry';

export default function NewsDashboard({ initialEntries }: { initialEntries: NewsEntry[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [entries] = useState(initialEntries);
  const entriesPerPage = 6;
  const totalPages = Math.ceil(entries.length / entriesPerPage);

  const currentEntries = entries.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [entries]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <BackToDashboardButton className="mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">Aktuelle Neuigkeiten</h1>
      </div>

      {entries.length === 0 ? (
        <p className="text-center text-gray-600">Keine Neuigkeiten verfügbar.</p>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentEntries.map((newsentry: NewsEntry) => (
              <NewsDashboardItem key={newsentry.id} newsentry={newsentry} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="mt-8 flex items-center justify-center space-x-4" aria-label="Pagination">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
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
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
                aria-label="Nächste Seite"
              >
                Nächste <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </nav>
          )}
        </>
      )}
    </main>
  );
}
