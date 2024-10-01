'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import { EventForm } from '@/components/calender/components/calender-event-form';
import { CalendarGrid } from '@/components/calender/components/calender-grid';
import { CalendarHeader } from '@/components/calender/components/calender-header';
import { useCalendar } from '@/components/calender/hooks/use-calender';
import { useEvents } from '@/components/calender/hooks/use-calender-events';
import { CalendarDate, CalendarEvent } from '@/components/calender/types/calender-types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

function CalendarWithForm() {
  const { data: session } = useSession();
  const { currentDate, calendarDays, changeMonth, goToCurrentMonth, isCurrentMonth } = useCalendar();
  const { events, isLoading, fetchEvents, createEvent } = useEvents();
  const [selectedDay, setSelectedDay] = useState<CalendarDate | null>(null);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [formInitialDate, setFormInitialDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    fetchEvents(currentDate.getMonth());
  }, [currentDate, fetchEvents]);

  const calendarDaysWithEvents: CalendarDate[] = calendarDays.map((day) => {
    const event = events.find(
      (event) =>
        event.date.getDate() === day.date.getDate() &&
        event.date.getMonth() === day.date.getMonth() &&
        event.date.getFullYear() === day.date.getFullYear()
    );
    return {
      ...day,
      event: event || undefined,
    };
  });

  const handleDayClick = useCallback(
    (day: CalendarDate) => {
      if (day.event) {
        setSelectedDay(day);
      } else if (session) {
        setFormInitialDate(day.date);
        setIsFormDialogOpen(true);
      } else {
        setSelectedDay({
          ...day,
          event: {
            id: 0,
            title: 'Verfügbar',
            date: day.date,
            details: 'Keine Buchung vorhanden',
          },
        });
      }
    },
    [session]
  );

  const handleEventSubmit = async (values: Omit<CalendarEvent, 'id'>) => {
    if (session) {
      const success = await createEvent(values);
      if (success) {
        setIsFormDialogOpen(false);
        fetchEvents(currentDate.getMonth());
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CalendarHeader
        currentDate={currentDate}
        isCurrentMonth={isCurrentMonth}
        onPrevMonth={() => changeMonth(-1)}
        onNextMonth={() => changeMonth(1)}
        onGoToCurrentMonth={goToCurrentMonth}
      />
      <CalendarGrid calendarDays={calendarDaysWithEvents} onDayClick={handleDayClick} />
      {isLoading && <div className="text-center">Lade Ereignisse...</div>}
      <div className="mt-6 flex justify-center space-x-4">
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 bg-green-500"></div>
          <span>Verfügbar</span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 bg-red-500"></div>
          <span>Nicht verfügbar</span>
        </div>
      </div>
      <Dialog open={!!selectedDay} onOpenChange={(open) => !open && setSelectedDay(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedDay?.event && selectedDay.event.id !== 0 ? selectedDay.event.title : 'Verfügbar'}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Datum:{' '}
            {selectedDay?.date.toLocaleDateString('de-DE', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </DialogDescription>
          <p>Status: {selectedDay?.event && selectedDay.event.id !== 0 ? 'Nicht verfügbar' : 'Verfügbar'}</p>
          <p>{selectedDay?.event?.details || 'Keine Buchung vorhanden'}</p>
        </DialogContent>
      </Dialog>
      {session && (
        <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neuen Kalendereintrag erstellen</DialogTitle>
            </DialogHeader>
            <EventForm onSubmit={handleEventSubmit} initialDate={formInitialDate} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default function CalendarWithFormWrapper() {
  return (
    <SessionProvider>
      <CalendarWithForm />
    </SessionProvider>
  );
}
