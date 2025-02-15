import { unstable_noStore as noStore } from 'next/cache';
import { Suspense } from 'react';

import EventDashboardItem from '@/components/cards/event-dashboard-item';
import { EmptyState } from '@/components/empty-state';
import { ErrorMessage } from '@/components/error-message';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchEvents } from '@/lib/api';
import type { EventEntry } from '@/lib/types/event-entry';

export default async function EventDashboard() {
  noStore();
  let events: EventEntry[] = [];
  let error: Error | null = null;

  try {
    events = await fetchEvents();
  } catch (e) {
    error = e instanceof Error ? e : new Error('An unknown error occurred');
  }

  return (
    <Suspense fallback={<EventDashboardSkeleton />}>
      <EventList events={events} error={error} />
    </Suspense>
  );
}

function EventList({ events, error }: { events: EventEntry[]; error: Error | null }) {
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (events.length === 0) {
    return <EmptyState message="Keine Veranstaltungen für heute oder die Zukunft gefunden." />;
  }

  return (
    <div
      className="space-y-8 rounded-lg bg-westerloyBackground p-6 shadow-md"
      role="list"
      aria-label="Veranstaltungsliste"
    >
      {events.map((event) => (
        <EventDashboardItem key={event.id} event={event} />
      ))}
    </div>
  );
}

function EventDashboardSkeleton() {
  return (
    <div className="space-y-8 rounded-lg bg-westerloyBackground p-6 shadow-md">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex w-full space-x-4 rounded-md bg-westerloyPrimary/5 p-4">
          <Skeleton className="h-24 w-24 flex-shrink-0 bg-westerloySecondary/20" />
          <div className="flex-grow space-y-2">
            <Skeleton className="h-6 w-3/4 bg-westerloySecondary/20" />
            <Skeleton className="h-4 w-1/2 bg-westerloySecondary/20" />
            <Skeleton className="h-4 w-1/4 bg-westerloySecondary/20" />
          </div>
        </div>
      ))}
    </div>
  );
}
