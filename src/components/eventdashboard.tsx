import { unstable_noStore as noStore } from 'next/cache';

import EventDashboardItem from '@/components/cards/event-dashboard-item';
import { EventEntry } from '@/lib/types/event-entry';
import { prisma } from '@/lib/utils/prisma-client';

export default async function EventDashboard() {
  noStore();

  const eventEntries = await prisma.eventEntries.findMany({
    where: {
      timeOfEvent: {
        gte: new Date(),
      },
    },
    orderBy: [{ timeOfEvent: 'asc' }],
  });
  return (
    <div className="flex w-3/4 flex-col items-center justify-between gap-y-12 xl:w-2/3 xl:gap-y-24">
      {eventEntries.map(function (eventEntry: EventEntry) {
        return <EventDashboardItem eventEntry={eventEntry} key={eventEntry.id} />;
      })}
    </div>
  );
}
