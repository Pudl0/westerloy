import EventDashboardItem from '@/components/cards/event-dashboard-item';
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

  if (events.length === 0) {
    return <div className="text-center text-gray-600">No upcoming events at the moment.</div>;
  }

  return (
    <div className="space-y-8">
      {events.map((event) => (
        <EventDashboardItem key={event.id} eventEntry={event} />
      ))}
    </div>
  );
}
