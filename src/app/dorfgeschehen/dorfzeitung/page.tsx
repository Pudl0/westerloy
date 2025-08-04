'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import { NewspaperGrid } from './components/newspaper-grid';
import { SearchBar } from './components/search-bar';

interface Newspaper {
  id: number;
  title: string;
  date: string;
  description: string;
  pages: number;
  size: string;
  pdfUrl: string;
}

export default function NewspaperArchive() {
  const [newspapers, setNewspapers] = useState<Newspaper[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNewspapers, setFilteredNewspapers] = useState<Newspaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNewspapers();
  }, []);

  const loadNewspapers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/newspapers');
      const data = await response.json();

      setNewspapers(data);
      setFilteredNewspapers(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten');
      setNewspapers([]);
      setFilteredNewspapers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = newspapers.filter(
      (newspaper) =>
        newspaper.title.toLowerCase().includes(term.toLowerCase()) ||
        newspaper.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredNewspapers(filtered);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-stone-600"></div>
          <p className="text-stone-800">Zeitungen werden geladen...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100">
        <div className="mx-auto max-w-md p-6 text-center">
          <AlertCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
          <h2 className="mb-2 text-xl font-semibold text-stone-900">Verbindungsfehler</h2>
          <p className="mb-4 text-stone-800">{error}</p>
          <p className="mb-6 text-sm text-stone-700">
            Bitte überprüfen Sie Ihre Internetverbindung oder versuchen Sie es später erneut.
          </p>
          <Button
            onClick={loadNewspapers}
            className="flex items-center gap-2 bg-stone-600 text-white hover:bg-stone-700"
          >
            <RefreshCw className="h-4 w-4" />
            Erneut versuchen
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-stone-900">Archiv der Dorfzeitung</h1>
          <p className="mx-auto max-w-2xl text-lg text-stone-800">
            Durchsuchen Sie unsere komplette Sammlung von Dorfzeitungen. Klicken Sie auf "Vorschau" für eine schnelle
            Ansicht oder "Download" zum Herunterladen.
          </p>
        </div>

        {/* Search */}
        <SearchBar onSearch={handleSearch} />

        {/* Results count */}
        <div className="mb-6 text-center">
          <p className="text-stone-700">
            {searchTerm
              ? `${filteredNewspapers.length} Ausgaben gefunden für "${searchTerm}"`
              : newspapers.length > 0
                ? `Alle ${newspapers.length} Ausgaben werden angezeigt`
                : 'Keine Zeitungen verfügbar'}
          </p>
        </div>

        {/* Newspaper Grid */}
        <NewspaperGrid newspapers={filteredNewspapers} />
      </div>
    </div>
  );
}
