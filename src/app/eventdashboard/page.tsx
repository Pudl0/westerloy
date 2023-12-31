import EventDashboardItem from '@/components/cards/event-dashboard-item';
import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';
import { EventEntry } from '@/lib/types/event-entry';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function EventDashboard() {
  const eventEntries = (await prisma.eventEntries.findMany()).sort(function (a, b) {
    return +b.timeOfEvent - +a.timeOfEvent;
  });
  prisma.$disconnect();
  return (
    <div className="my-12 flex min-h-screen flex-col items-center justify-between gap-y-24">
      <BackToDashboardButton></BackToDashboardButton>
      {eventEntries.map(function (eventEntry: EventEntry) {
        return <EventDashboardItem eventEntry={eventEntry} key={eventEntry.id} />;
      })}
    </div>
  );
}
