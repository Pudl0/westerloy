import EventDashboardItem from '@/components/cards/event-dashboard-item';
import { EventEntry } from '@/lib/types/event-entry';
import { PrismaClient } from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache';

const prisma = new PrismaClient();

export default async function EventDashboard() {
  noStore();

  const eventEntries = await prisma.eventEntries.findMany({
    where: {
      timeOfEvent: {
        gte: new Date('2024-04-11'),
      },
    },
    orderBy: [{ timeOfEvent: 'asc' }],
  });
  prisma.$disconnect();
  return (
    <div className="my-12 flex min-h-screen flex-col items-center justify-between gap-y-24">
      {eventEntries.map(function (eventEntry: EventEntry) {
        return <EventDashboardItem eventEntry={eventEntry} key={eventEntry.id} />;
      })}
    </div>
  );
}
