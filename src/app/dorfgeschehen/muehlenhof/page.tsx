import EventCalendar from '@/components/calender/calender';

export default function CalendarPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Buchungszeiten Mühlenhof</h1>
      <EventCalendar />
    </div>
  );
}
