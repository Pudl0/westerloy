import { CalendarDays, MapPin } from 'lucide-react';
import Image from 'next/image';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { EventEntry } from '@/lib/types/event-entry';

interface EventDashboardItemProps {
  event: EventEntry;
}

export default function EventDashboardItem({ event }: EventDashboardItemProps) {
  const { Title, Description, TimeOfEvent, Location, Picture } = event.attributes;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image src={Picture} alt={Title} fill style={{ objectFit: 'cover' }} />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="mb-2">{Title}</CardTitle>
        <p className="text-sm text-gray-600">{Description}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 text-sm text-gray-500">
        <div className="flex items-center">
          <CalendarDays className="mr-2 h-4 w-4" />
          {new Date(TimeOfEvent).toLocaleString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4" />
          {Location}
        </div>
      </CardFooter>
    </Card>
  );
}
