import { useCallback, useState } from 'react';

import { API_ROUTES, TOAST_MESSAGES } from '@/components/calender/constants';
import { CalendarEvent } from '@/components/calender/types/calender-types';
import { toast } from '@/hooks/use-toast';

export function useEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = useCallback(async (month: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_ROUTES.CALENDAR_EVENTS}?month=${month + 1}`);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(
        data.map((event: CalendarEvent) => ({
          ...event,
          date: new Date(event.date),
        }))
      );
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: 'Fehler',
        description: TOAST_MESSAGES.EVENTS_FETCH_ERROR,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createEvent = useCallback(async (eventData: Omit<CalendarEvent, 'id'>) => {
    try {
      const response = await fetch(API_ROUTES.CALENDAR_EVENTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const data = await response.json();
      setEvents((prevEvents) => [...prevEvents, { ...data, date: new Date(data.date) }]);
      toast({
        title: 'Kalendereintrag erstellt',
        description: TOAST_MESSAGES.EVENT_CREATED(data.title, new Date(data.date).toLocaleDateString('de-DE')),
      });
      return true;
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: 'Fehler',
        description: TOAST_MESSAGES.EVENT_CREATION_ERROR,
        variant: 'destructive',
      });
      return false;
    }
  }, []);

  return {
    events,
    isLoading,
    fetchEvents,
    createEvent,
  };
}
