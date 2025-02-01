'use client';

import { CalendarDays, Download, MapPin } from 'lucide-react';
import { useState } from 'react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { EventEntry } from '@/lib/types/event-entry';

interface EventDashboardItemProps {
  event: EventEntry;
}

export default function EventDashboardItem({ event }: EventDashboardItemProps) {
  const { Title, Description, TimeOfEvent, Location } = event.attributes;
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const generateICS = () => {
    const startDate = new Date(TimeOfEvent);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${Title}`,
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `DESCRIPTION:${Description.replace(/\n/g, '\\n')}`,
      `LOCATION:${Location}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${Title.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="p-5 pb-3">
        <CardTitle className="text-2xl font-bold text-primary">{Title}</CardTitle>
      </CardHeader>
      <CardContent className="p-5 pt-2">
        <div className="mb-4 flex flex-col space-y-3 text-base text-gray-700">
          <div className="flex items-center">
            <CalendarDays className="mr-3 h-5 w-5 text-primary" />
            {new Date(TimeOfEvent).toLocaleString('de-DE', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
          <div className="flex items-center">
            <MapPin className="mr-3 h-5 w-5 text-primary" />
            {Location}
          </div>
        </div>
        {showDescription && (
          <p className="mt-3 text-base text-gray-600 transition-all duration-300 ease-in-out">{Description}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-5 pt-0">
        <button
          onClick={toggleDescription}
          className="rounded-md bg-primary px-6 py-2 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {showDescription ? 'Weniger anzeigen' : 'Mehr Details'}
        </button>
        <button
          onClick={generateICS}
          className="flex items-center rounded-md bg-secondary px-6 py-2 text-base font-medium text-secondary-foreground transition-colors hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
        >
          <Download className="mr-2 h-5 w-5" />
          Termin speichern
        </button>
      </CardFooter>
    </Card>
  );
}
