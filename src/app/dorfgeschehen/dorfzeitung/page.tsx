'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

async function fetchNewspaper() {
  const response = await fetch('/api/newspaper', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch newspaper data');
  }
  const data = await response.json();
  return data.files;
}

export default function NewspaperViewer() {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [selectedPDF, setSelectedPDF] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNewspapers = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchNewspaper();
      const sortedData = data.sort((a: string, b: string) => b.localeCompare(a, 'de', { numeric: true }));
      setFileNames(sortedData);
      if (sortedData.length > 0 && !selectedPDF) {
        setSelectedPDF(sortedData[0]);
      }
    } catch (err) {
      setError('Failed to load newspapers. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedPDF]);

  useEffect(() => {
    loadNewspapers();
  }, [loadNewspapers]);

  const handleFileClick = (fileName: string) => {
    setSelectedPDF(fileName);
  };

  const handlePrevious = () => {
    const currentIndex = fileNames.indexOf(selectedPDF);
    if (currentIndex > 0) {
      setSelectedPDF(fileNames[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = fileNames.indexOf(selectedPDF);
    if (currentIndex < fileNames.length - 1) {
      setSelectedPDF(fileNames[currentIndex + 1]);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BackToDashboardButton />
        <div className="mt-8 text-center">
          <p className="text-red-500">{error}</p>
          <Button onClick={loadNewspapers} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackToDashboardButton />
      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-3/4">
          {isLoading ? (
            <Skeleton className="h-[80vh] w-full" />
          ) : selectedPDF ? (
            <div className="relative">
              <iframe
                src={`/uploads/dorfzeitung/${selectedPDF}`}
                className="h-[80vh] w-full rounded border"
                title={`Newspaper: ${selectedPDF}`}
              />
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-4">
                <Button onClick={handlePrevious} disabled={fileNames.indexOf(selectedPDF) === 0}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button onClick={handleNext} disabled={fileNames.indexOf(selectedPDF) === fileNames.length - 1}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-center">No newspaper selected</p>
          )}
        </div>
        <div className="lg:w-1/4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="text-2xl font-bold leading-none">Alle Zeitungen</h3>
            </div>
            <ScrollArea className="h-[70vh]">
              <div className="p-4">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} className="mb-2 h-14 w-full" />)
                  : fileNames.map((fileName) => (
                      <Button
                        key={fileName}
                        variant={selectedPDF === fileName ? 'secondary' : 'ghost'}
                        className="mb-2 w-full justify-start"
                        onClick={() => handleFileClick(fileName)}
                      >
                        <div className="text-left">
                          <p className="font-medium">{fileName}</p>
                          <p className="text-sm text-muted-foreground">Veröffentlichung</p>
                        </div>
                      </Button>
                    ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
