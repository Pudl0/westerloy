import DashboardDivider from '@/components/dashboard-divider';
import DashboardHeader from '@/components/dashboard-header';
import EventDashboard from '@/components/eventdashboard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-y-12 px-4">
      <DashboardHeader />
      <DashboardDivider />
      <EventDashboard />
    </main>
  );
}
