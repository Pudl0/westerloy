import EventDashboardItem from '@/components/cards/event-dashboard-item';

export default function EventDashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-y-24 p-10">
      <EventDashboardItem></EventDashboardItem>
      <EventDashboardItem></EventDashboardItem>
    </main>
  );
}
