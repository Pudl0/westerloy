'use client';

import { Search, X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="relative mx-auto mb-8 max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-stone-700" />
      <Input
        type="text"
        placeholder="Zeitungen durchsuchen..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="border-2 border-stone-600 bg-stone-50 pl-10 pr-10 text-stone-900 placeholder:text-stone-600"
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearSearch}
          className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 transform p-0 text-stone-700 hover:text-stone-900"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
