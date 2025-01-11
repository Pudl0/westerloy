import { unstable_noStore as noStore } from 'next/cache';
import { Suspense } from 'react';

import EventDashboardItem from '@/components/cards/event-dashboard-item';
import { Skeleton } from '@/components/ui/skeleton';
import { EventEntry } from '@/lib/types/event-entry';

const API_URL = process.env.STRAPI_PUBLIC_API_URL;

async function fetchEvents(): Promise<EventEntry[]> {
  noStore(); // Disable caching for this request
  const username = process.env.STRAPI_USERNAME;
  const password = process.env.STRAPI_PASSWORD;

  if (!username || !password) {
    console.error('Strapi credentials are not set');
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

    const currentDate = new Date().toISOString();
    const eventsResponse = await fetch(
      `${API_URL}/api/event-entries?populate=*&filters[TimeOfEvent][$gt]=${currentDate}`,
      {
        headers: { Authorization: `Bearer ${authData.jwt}` },
      }
    );

    if (!eventsResponse.ok) {
      throw new Error('Failed to fetch events');
    }

    const eventsData = await eventsResponse.json();

    return eventsData.data.map(
      (item: any): EventEntry => ({
        id: item.id,
        attributes: {
          Title: item.attributes.Title || 'Kein Titel',
          Description: item.attributes.Description || 'Keine Beschreibung',
          TimeOfEvent: new Date(item.attributes.TimeOfEvent),
          Location: item.attributes.Location || 'Kein Ort angegeben',
          Picture: item.attributes.Picture?.data?.attributes?.url
            ? `${API_URL}${item.attributes.Picture.data.attributes.url}`
            : '/placeholder.svg',
        },
      })
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
  // Client-side filtering as a fallback
  const currentEvents = events.filter((event) => new Date(event.attributes.TimeOfEvent) > new Date());

  if (currentEvents.length === 0) {
    return <div className="text-center text-gray-600">Keine anstehenden Veranstaltungen.</div>;
  }

  return (
    <div className="space-y-8">
      {currentEvents.map((event) => (
        <EventDashboardItem key={event.id} event={event} />
      ))}
    </div>
  );
}

function EventDashboardSkeleton() {
  return (
    <div className="space-y-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-full space-y-2">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
