import { Suspense } from 'react';

import EventDashboardItem from '@/components/cards/event-dashboard-item';
import { Skeleton } from '@/components/ui/skeleton';
import { EventEntry } from '@/lib/types/event-entry';
import { prisma } from '@/lib/utils/prisma-client';

async function fetchEvents(): Promise<EventEntry[]> {
  const now = new Date();
  const events = await prisma.eventEntries.findMany({
    where: {
      timeOfEvent: {
        gt: now,
      },
    },
    orderBy: {
      timeOfEvent: 'asc',
    },
  });
  return events.map((event) => ({
    ...event,
    timeOfEvent: new Date(event.timeOfEvent),
  }));
}

export default async function EventDashboard() {
  const events = await fetchEvents();

  return (
    <Suspense fallback={<EventDashboardSkeleton />}>
      <EventList events={events} />
    </Suspense>
  );
}

function EventList({ events }: { events: EventEntry[] }) {
  if (events.length === 0) {
    return <div className="text-center text-gray-600">Keine anstehenden Veranstaltungen.</div>;
  }

  return (
    <div className="space-y-8">
      {events.map((event) => (
        <EventDashboardItem key={event.id} eventEntry={event} />
      ))}
    </div>
  );
}

function EventDashboardSkeleton() {
  return (
    <div className="space-y-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-full space-y-2">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
