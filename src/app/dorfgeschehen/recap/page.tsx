import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

import RecapDashboardItem from '@/components/cards/recap-dashboard-item';
import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';
import { RecapEntry } from '@/lib/types/recap-entry';
import { prisma } from '@/lib/utils/prisma-client';

async function getRecapEntries() {
  const recapEntries = await prisma.recapEntries.findMany({
    orderBy: { id: 'desc' },
  });
  return recapEntries;
}

function RecapList({ entries }: { entries: RecapEntry[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {entries.map((recapentry: RecapEntry) => (
        <RecapDashboardItem recapentry={recapentry} key={recapentry.id} />
      ))}
    </div>
  );
}

export default async function Recap() {
  const recapEntries = await getRecapEntries();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <BackToDashboardButton className="mb-8" />
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Rückblicke auf Veranstaltungen</h1>
          <p className="text-lg text-gray-600">
            Entdecken Sie die Highlights vergangener Ereignisse in unserer Gemeinde
          </p>
        </header>
        <Suspense fallback={<RecapListSkeleton />}>
          <RecapList entries={recapEntries} />
        </Suspense>
      </div>
    </div>
  );
}

function RecapListSkeleton() {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
    </div>
  );
}
