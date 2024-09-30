'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import NewsDashboardItem from '@/components/cards/news-dashboard-item';
import { MuehlenhofIcon } from '@/components/muehelnhof-icon';
import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { NewsEntry } from '@/lib/types/news-entry';

export default function NewsDashboard({ initialEntries }: { initialEntries: NewsEntry[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [entries] = useState(initialEntries);
  const [selectedEntry, setSelectedEntry] = useState<NewsEntry | null>(null);
  const [modalImageError, setModalImageError] = useState(false);
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

  const openNewsModal = (entry: NewsEntry) => {
    setSelectedEntry(entry);
    setModalImageError(false);
  };

  const closeNewsModal = () => {
    setSelectedEntry(null);
    setModalImageError(false);
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
              <NewsDashboardItem key={newsentry.id} newsentry={newsentry} onReadMore={openNewsModal} />
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

      <Dialog open={!!selectedEntry} onOpenChange={closeNewsModal}>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">{selectedEntry?.title}</DialogTitle>
          </DialogHeader>
          {selectedEntry && (
            <div className="mt-6">
              <div className="relative mb-6 h-80 w-full">
                {!modalImageError ? (
                  <Image
                    src={selectedEntry.pictureLink}
                    alt={selectedEntry.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    onError={() => setModalImageError(true)}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-200">
                    <MuehlenhofIcon className="h-32 w-32 text-gray-400" />
                  </div>
                )}
              </div>
              <p className="text-lg leading-relaxed text-gray-700">{selectedEntry.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
