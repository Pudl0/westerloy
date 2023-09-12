import EventDashboardItem from '@/components/cards/event-dashboard-item';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function EventDashboard() {
  const eventEntries = await prisma.evententries.findMany();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-y-24 my-12">
      {eventEntries.map(function (object) {
        return <EventDashboardItem eventEntry={object} key={object.id} />;
      })}
    </div>
  );
}
