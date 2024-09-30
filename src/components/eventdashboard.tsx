'use client';

import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';

import EventDashboardItem from '@/components/cards/event-dashboard-item';
import { EventEntry } from '@/lib/types/event-entry';
import { prisma } from '@/lib/utils/prisma-client';

async function fetchEvents() {
  const events = await prisma.eventEntries.findMany({
    orderBy: {
      timeOfEvent: 'asc',
    },
  });
  return events.map((event) => ({
    ...event,
    timeOfEvent: new Date(event.timeOfEvent),
  }));
}

export default function EventDashboard() {
  const [events, setEvents] = useState<EventEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error('Error loading events:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadEvents();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <SessionProvider>
      <div className="space-y-8">
        {events.map((event) => (
          <EventDashboardItem key={event.id} eventEntry={event} />
        ))}
      </div>
    </SessionProvider>
  );
}
