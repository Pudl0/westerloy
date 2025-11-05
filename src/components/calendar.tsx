'use client';

import { de } from 'date-fns/locale';
import ICAL from 'ical.js';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type Event = {
  id: string;
  summary: string;
  start: Date;
  end: Date;
  isFullDay: boolean;
  description?: string;
  location?: string;
};

type CalendarWithICSProps = {
  icsLink: string;
};

export function CalendarWithICS({ icsLink }: CalendarWithICSProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const fetchAndParseICS = async () => {
    setIsLoading(true);

    if (!icsLink) {
      setIsLoading(false);
      return;
    }

    try {
      const proxyUrl = `/api/proxy-ics?url=${encodeURIComponent(icsLink)}`;
      const response = await fetch(proxyUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const icsData = await response.text();

      if (!icsData || icsData.trim() === '') {
        throw new Error('Leere ICS-Daten erhalten');
      }

      const jcalData = ICAL.parse(icsData);
      const comp = new ICAL.Component(jcalData);
      const vevents = comp.getAllSubcomponents('vevent');

      if (vevents.length === 0) {
        setIsLoading(false);
        return;
      }

      const parsedEvents: Event[] = vevents
        .map((vevent): Event | null => {
          try {
            const event = new ICAL.Event(vevent);
            if (!event.startDate || !event.endDate) return null;

            const isFullDay = event.startDate.isDate;
            let start: Date, end: Date;

            if (isFullDay) {
              start = new Date(event.startDate.year, event.startDate.month - 1, event.startDate.day);
              end = new Date(event.endDate.year, event.endDate.month - 1, event.endDate.day - 1);
            } else {
              start = event.startDate.toJSDate();
              end = event.endDate.toJSDate();
            }

            const parsedEvent: Event = {
              id: event.uid || crypto.randomUUID(),
              summary: event.summary || 'Unbenannter Termin',
              start,
              end,
              isFullDay,
            };

            if (event.description) {
              parsedEvent.description = event.description;
            }
            if (event.location) {
              parsedEvent.location = event.location;
            }

            return parsedEvent;
          } catch {
            return null;
          }
        })
        .filter((e): e is Event => e !== null);

      if (parsedEvents.length === 0) {
        setIsLoading(false);
        return;
      }

      setEvents(parsedEvents);
    } catch (error) {
      console.error('Failed to load calendar data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasEventsOnDate = (date: Date, fullDayOnly = false) => {
    return events.some((event) => {
      if (fullDayOnly && !event.isFullDay) return false;
      if (!fullDayOnly && event.isFullDay) return false;

      if (event.isFullDay) {
        const dateTime = date.setHours(0, 0, 0, 0);
        const eventStart = new Date(event.start).setHours(0, 0, 0, 0);
        const eventEnd = new Date(event.end).setHours(23, 59, 59, 999);
        return dateTime >= eventStart && dateTime <= eventEnd;
      }

      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return [];

    return events.filter((event) => {
      if (event.isFullDay) {
        const selectedTime = date.setHours(0, 0, 0, 0);
        const eventStart = new Date(event.start).setHours(0, 0, 0, 0);
        const eventEnd = new Date(event.end).setHours(23, 59, 59, 999);
        return selectedTime >= eventStart && selectedTime <= eventEnd;
      }

      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  useEffect(() => {
    fetchAndParseICS();
  }, [icsLink, currentMonth]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(['de-DE'], { hour: '2-digit', minute: '2-digit' });
  };

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
    setSelectedDate(undefined);
  };

  const handleReturnToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  const selectedDateEvents = getEventsForDate(selectedDate);

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_300px]">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Kalender</CardTitle>
              <CardDescription>Sehen Sie Ihre Verfügbarkeit und gebuchten Termine</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleReturnToToday}>
              Heute
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={handleMonthChange}
              className="rounded-md border"
              locale={de}
              modifiers={{
                fullyBooked: (date) => hasEventsOnDate(date, true),
                partlyBooked: (date) => !hasEventsOnDate(date, true) && hasEventsOnDate(date, false),
                available: (date) => !hasEventsOnDate(date, true) && !hasEventsOnDate(date, false),
              }}
              modifiersClassNames={{
                fullyBooked:
                  'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-800/30',
                partlyBooked:
                  'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:hover:bg-yellow-800/30',
                available:
                  'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-800/30',
              }}
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex flex-wrap justify-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Verfügbar</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Teilweise gebucht</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-sm">Ganztägig gebucht</span>
            </div>
          </div>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? (
                <span>
                  Termine am{' '}
                  {selectedDate.toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </span>
              ) : (
                'Wählen Sie ein Datum'
              )}
            </CardTitle>
          </CardHeader>
          <CardContent
            key={selectedDate?.toISOString()}
            className="duration-300 animate-in fade-in slide-in-from-right-5"
          >
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="rounded-lg border p-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium">{'Gebucht'}</h3>
                      {event.isFullDay ? (
                        <Badge variant="destructive">Ganztägig</Badge>
                      ) : (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {formatTime(event.start)} - {formatTime(event.end)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : selectedDate ? (
              <div className="py-6 text-center text-muted-foreground">Keine Termine an diesem Tag</div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
