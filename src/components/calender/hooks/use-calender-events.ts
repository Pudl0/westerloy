import { useCallback, useState } from 'react';

import { API_ROUTES } from '@/components/calender/constants';
import { CalendarEvent } from '@/components/calender/types/calender-types';

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
      return true;
    } catch (error) {
      console.error('Error creating event:', error);
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
