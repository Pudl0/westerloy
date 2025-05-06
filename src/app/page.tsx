import { Suspense } from 'react';

import BreakingNews from '@/components/breaking-news';
import DashboardDivider from '@/components/dashboard-divider';
import DashboardHeader from '@/components/dashboard-header';
import EventDashboard from '@/components/eventdashboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const breakingNews: string | any[] = [];

  return (
    <div className="min-h-screen bg-westerloyBackground">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader />

        {breakingNews.length > 0 && (
          <section className="mb-12 mt-16">
            <DashboardDivider title="Eilmeldungen" />
            <div className="mt-6">
              <Suspense fallback={<BreakingNewsSkeleton newsCount={breakingNews.length} />}>
                <BreakingNews news={breakingNews} />
              </Suspense>
            </div>
          </section>
        )}
        
        <section className={`mb-12 ${breakingNews.length === 0 ? 'mt-16' : ''}`}>
          <DashboardDivider title="Aktuelle Veranstaltungen" />
          <div className="mt-6">
            <Suspense fallback={<EventDashboardSkeleton />}>
              <EventDashboard />
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  );
}

function BreakingNewsSkeleton({ newsCount }: { newsCount: number }) {
  const gridCols = newsCount === 1 ? 'grid-cols-1' : newsCount === 2 ? 'grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3';
  const cardSize = newsCount <= 2 ? 'max-w-2xl mx-auto' : 'w-full';

  return (
    <div className={`grid gap-4 ${gridCols} ${newsCount <= 2 ? 'justify-center' : ''}`}>
      {[...Array(newsCount)].map((_, i) => (
        <Skeleton key={i} className={`h-24 ${cardSize} bg-westerloyPrimary/10`} />
      ))}
    </div>
  );
}

function EventDashboardSkeleton() {
  return (
    <div className="grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-full max-w-sm space-y-4 rounded-lg bg-westerloyPrimary p-4 shadow-md">
          <Skeleton className="h-48 w-full bg-westerloySecondary/20" />
          <Skeleton className="h-4 w-3/4 bg-westerloySecondary/20" />
          <Skeleton className="h-4 w-1/2 bg-westerloySecondary/20" />
        </div>
      ))}
    </div>
  );
}
