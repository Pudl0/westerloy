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
    console.error('Missing Strapi credentials');
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

    // Get the start of today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch all events from the start of today onwards
    const eventsResponse = await fetch(
      `${API_URL}/api/event-entries?populate=*&pagination[pageSize]=10000&pagination[withCount]=true&filters[TimeOfEvent][$gte]=${today.toISOString()}&sort=TimeOfEvent:asc`,
      {
        headers: { Authorization: `Bearer ${authData.jwt}` },
      }
    );

    if (!eventsResponse.ok) {
      throw new Error('Failed to fetch events');
    }

    const eventsData = await eventsResponse.json();

    if (!eventsData.data || !Array.isArray(eventsData.data)) {
      console.error('Unexpected API response structure');
      return [];
    }

    console.log(`Fetched ${eventsData.data.length} events out of ${eventsData.meta.pagination.total}`);

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

    // Sort events by TimeOfEvent in ascending order (earliest first)
    return events.sort(
      (a: EventEntry, b: EventEntry) => a.attributes.TimeOfEvent.getTime() - b.attributes.TimeOfEvent.getTime()
    );
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error; // Re-throw the error to be handled by the component
  }
}

export default async function EventDashboard() {
  let events: EventEntry[] = [];
  let error: Error | null = null;

  try {
    events = await fetchEvents();
  } catch (e) {
    error = e instanceof Error ? e : new Error('An unknown error occurred');
  }

  return (
    <Suspense fallback={<EventDashboardSkeleton />}>
      <EventList events={events} error={error} />
    </Suspense>
  );
}

function EventList({ events, error }: { events: EventEntry[]; error: Error | null }) {
  if (error) {
    return (
      <div className="text-center text-westerloySecondary">
        <p>Fehler beim Laden der Veranstaltungen: {error.message}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center text-westerloySecondary">
        <p>Keine Veranstaltungen für heute oder die Zukunft gefunden.</p>
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
