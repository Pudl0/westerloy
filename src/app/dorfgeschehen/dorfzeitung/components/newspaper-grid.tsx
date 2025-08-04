'use client';

import { Calendar, Download, Eye, FileText, HardDrive } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Newspaper {
  id: number;
  title: string;
  date: string;
  description: string;
  pages: number;
  size: string;
  pdfUrl: string;
}

interface NewspaperGridProps {
  newspapers: Newspaper[];
}

export function NewspaperGrid({ newspapers }: NewspaperGridProps) {
  const [selectedNewspaper, setSelectedNewspaper] = useState<Newspaper | null>(null);

  const handlePreview = (newspaper: Newspaper) => {
    setSelectedNewspaper(newspaper);
  };

  const handleDownload = (newspaper: Newspaper) => {
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = newspaper.pdfUrl;
    link.download = `${newspaper.title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (newspapers.length === 0) {
    return (
      <div className="py-12 text-center">
        <FileText className="mx-auto mb-4 h-16 w-16 text-stone-400" />
        <h3 className="mb-2 text-xl font-semibold text-stone-900">Keine Zeitungen gefunden</h3>
        <p className="text-stone-700">Versuchen Sie einen anderen Suchbegriff.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {newspapers.map((newspaper) => (
          <Card
            key={newspaper.id}
            className="group border-stone-200 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader className="pb-3">
              {/* PDF Thumbnail Placeholder */}
              <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-lg border-2 border-stone-200 bg-gradient-to-br from-stone-50 to-stone-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="h-16 w-16 text-stone-400" />
                </div>
                <div className="absolute right-2 top-2">
                  <Badge variant="secondary" className="bg-stone-200 text-xs text-stone-800">
                    PDF
                  </Badge>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-colors duration-300 group-hover:bg-black/10 group-hover:opacity-100">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handlePreview(newspaper)}
                    className="bg-white/90 text-stone-900 hover:bg-white"
                  >
                    <Eye className="mr-1 h-4 w-4" />
                    Vorschau
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="mb-1 line-clamp-2 font-semibold text-stone-900">{newspaper.title}</h3>
                <div className="mb-2 flex items-center text-sm text-stone-700">
                  <Calendar className="mr-1 h-3 w-3" />
                  {newspaper.date}
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="mb-3 line-clamp-2 text-sm text-stone-800">{newspaper.description}</p>

              <div className="mb-4 flex items-center justify-between text-xs text-stone-600">
                <div className="flex items-center">
                  <FileText className="mr-1 h-3 w-3" />
                  {newspaper.pages} Seiten
                </div>
                <div className="flex items-center">
                  <HardDrive className="mr-1 h-3 w-3" />
                  {newspaper.size}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handlePreview(newspaper)}
                  className="flex-1 border-stone-300 text-stone-700 hover:bg-stone-50"
                >
                  <Eye className="mr-1 h-3 w-3" />
                  Vorschau
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDownload(newspaper)}
                  className="flex-1 bg-stone-600 text-white hover:bg-stone-700"
                >
                  <Download className="mr-1 h-3 w-3" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preview Modal */}
      <Dialog open={!!selectedNewspaper} onOpenChange={() => setSelectedNewspaper(null)}>
        <DialogContent className="h-[80vh] max-w-4xl p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-stone-900">{selectedNewspaper?.title}</DialogTitle>
            <div className="flex items-center gap-4 text-sm text-stone-700">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {selectedNewspaper?.date}
              </div>
              <div className="flex items-center">
                <FileText className="mr-1 h-4 w-4" />
                {selectedNewspaper?.pages} Seiten
              </div>
              <div className="flex items-center">
                <HardDrive className="mr-1 h-4 w-4" />
                {selectedNewspaper?.size}
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 p-6 pt-4">
            {selectedNewspaper && (
              <iframe
                src={selectedNewspaper.pdfUrl}
                className="h-full w-full rounded-lg border border-stone-200"
                title={`PDF Preview: ${selectedNewspaper.title}`}
              />
            )}
          </div>

          <div className="border-t border-stone-200 p-6 pt-0">
            <div className="flex items-center justify-between">
              <p className="text-sm text-stone-700">{selectedNewspaper?.description}</p>
              <Button
                onClick={() => selectedNewspaper && handleDownload(selectedNewspaper)}
                className="bg-stone-600 text-white hover:bg-stone-700"
              >
                <Download className="mr-2 h-4 w-4" />
                PDF herunterladen
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
