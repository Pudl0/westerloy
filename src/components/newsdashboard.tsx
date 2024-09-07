'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import NewsDashboardItem from '@/components/cards/news-dashboard-item';
import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';
import { Button } from '@/components/ui/button';
import { NewsEntry } from '@/lib/types/news-entry';

export default function NewsDashboard({ initialEntries }: { initialEntries: NewsEntry[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 6;
  const totalPages = Math.ceil(initialEntries.length / entriesPerPage);

  const currentEntries = initialEntries.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <BackToDashboardButton />
        <h1 className="text-2xl font-bold text-gray-900">Aktuelle Neuigkeiten</h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentEntries.map((newsentry: NewsEntry) => (
          <NewsDashboardItem key={newsentry.id} newsentry={newsentry} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center space-x-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
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
          >
            Nächste <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </main>
  );
}
