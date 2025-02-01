import { unstable_noStore as noStore } from 'next/cache';
import { Suspense } from 'react';

import EventDashboardItem from '@/components/cards/event-dashboard-item';
import { Skeleton } from '@/components/ui/skeleton';
import type { EventEntry } from '@/lib/types/event-entry';

const API_URL = process.env.STRAPI_PUBLIC_API_URL;

async function fetchEvents(): Promise<EventEntry[]> {
  noStore();
  const username = process.env.STRAPI_USERNAME;
  const password = process.env.STRAPI_PASSWORD;

  if (!username || !password) {
    return [];
  }

  try {
    const authResponse = await fetch(`${API_URL}/api/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: username, password: password }),
    });

    if (!authResponse.ok) {
      throw new Error('Authentication failed');
    }

    const authData = await authResponse.json();

    const eventsResponse = await fetch(`${API_URL}/api/event-entries?populate=*`, {
      headers: { Authorization: `Bearer ${authData.jwt}` },
    });

    if (!eventsResponse.ok) {
      throw new Error('Failed to fetch events');
    }

    const eventsData = await eventsResponse.json();

    if (!eventsData.data || !Array.isArray(eventsData.data)) {
      return [];
    }

    const events = eventsData.data
      .map((item: any): EventEntry => {
        return {
          id: item.id ?? 0,
          attributes: {
            Title: item.Title ?? 'Kein Titel',
            Description: item.Description ?? 'Keine Beschreibung',
            TimeOfEvent: item.TimeOfEvent ? new Date(item.TimeOfEvent) : new Date(),
            Location: item.Location ?? 'Kein Ort angegeben',
            Picture: item.Picture?.data?.attributes?.url
              ? `${API_URL}${item.Picture.data.attributes.url}`
              : '/placeholder.svg',
          },
        };
      })
      .filter(Boolean);

    // Sort events by TimeOfEvent
    return events.sort(
      (a: EventEntry, b: EventEntry) => a.attributes.TimeOfEvent.getTime() - b.attributes.TimeOfEvent.getTime()
    );
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export default async function EventDashboard() {
  const events = await fetchEvents();

  return (
    <Suspense fallback={<EventDashboardSkeleton />}>
      <EventList events={events} />
    </Suspense>
  );
}

function EventList({ events }: { events: EventEntry[] }) {
  if (events.length === 0) {
    return (
      <div className="text-center text-westerloySecondary">
        <p>Keine Veranstaltungen gefunden.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 rounded-lg bg-westerloyBackground p-6 shadow-md">
      {events.map((event) => (
        <EventDashboardItem key={event.id} event={event} />
      ))}
    </div>
  );
}

function EventDashboardSkeleton() {
  return (
    <div className="space-y-8 rounded-lg bg-westerloyBackground p-6 shadow-md">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-full space-y-2 rounded-md bg-westerloyPrimary/5 p-4">
          <Skeleton className="h-48 w-full bg-westerloySecondary/20" />
          <Skeleton className="h-4 w-3/4 bg-westerloySecondary/20" />
          <Skeleton className="h-4 w-1/2 bg-westerloySecondary/20" />
        </div>
      ))}
    </div>
  );
}
