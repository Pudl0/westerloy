import EventDashboardItem from '@/components/cards/event-dashboard-item';
import { EventEntry } from '@/lib/types/event-entry';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function EventDashboard() {
  const eventEntries = await prisma.evententries.findMany();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-y-24 my-12">
      {eventEntries.map(function (eventEntry: EventEntry) {
        return <EventDashboardItem eventEntry={eventEntry} key={eventEntry.id} />;
      })}
    </div>
  );
}
