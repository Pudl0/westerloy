import { Suspense } from 'react';

import DashboardDivider from '@/components/dashboard-divider';
import DashboardHeader from '@/components/dashboard-header';
import EventDashboard from '@/components/eventdashboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader />

        <section className="mb-12 mt-16">
          <DashboardDivider title="Aktuelle Veranstaltungen" />
          <div className="flex justify-center">
            <Suspense fallback={<EventDashboardSkeleton />}>
              <EventDashboard />
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  );
}

function EventDashboardSkeleton() {
  return (
    <div className="grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-full max-w-sm space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
