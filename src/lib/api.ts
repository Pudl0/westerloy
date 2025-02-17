import type { EventEntry } from '@/lib/types/event-entry';
import type { NewsEntry } from '@/lib/types/news-entry';

const API_URL = process.env.STRAPI_PUBLIC_API_URL;
const STRAPI_USERNAME = process.env.STRAPI_USERNAME;
const STRAPI_PASSWORD = process.env.STRAPI_PASSWORD;

async function authenticate() {
  if (!API_URL || !STRAPI_USERNAME || !STRAPI_PASSWORD) {
    throw new Error('Missing Strapi credentials or API URL');
  }

  const authResponse = await fetch(`${API_URL}/api/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier: STRAPI_USERNAME, password: STRAPI_PASSWORD }),
  });

  if (!authResponse.ok) {
    throw new Error('Authentication failed');
  }

  const authData = await authResponse.json();
  return authData.jwt;
}

export async function fetchEvents(): Promise<EventEntry[]> {
  try {
    const jwt = await authenticate();

    const currentDate = new Date().toISOString();
    const eventsResponse = await fetch(
      `${API_URL}/api/event-entries?populate=*&filters[TimeOfEvent][$gte]=${currentDate}&sort[0]=TimeOfEvent:asc`,
      {
        headers: { Authorization: `Bearer ${jwt}` },
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

    const events = eventsData.data
      .map(
        (item: any): EventEntry => ({
          id: item.id ?? 0,
          attributes: {
            Title: item.Title ?? 'Kein Titel',
            Description: item.Description ?? 'Keine Beschreibung',
            TimeOfEvent: item.TimeOfEvent ? new Date(item.TimeOfEvent) : new Date(),
            Location: item.Location ?? 'Kein Ort angegeben',
            Picture: item.Picture?.url ? `${API_URL}${item.Picture.url}` : '/placeholder.svg',
          },
        })
      )
      .filter(Boolean);

    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

export async function fetchNews(): Promise<NewsEntry[]> {
  try {
    const jwt = await authenticate();

    const newsResponse = await fetch(`${API_URL}/api/news-entries?populate=*`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    if (!newsResponse.ok) {
      throw new Error('Failed to fetch news');
    }

    const newsData = await newsResponse.json();

    return newsData.data.map(
      (item: any): NewsEntry => ({
        Id: item.id,
        attributes: {
          Title: item.Title || 'Kein Titel',
          ShortDescription: item.ShortDescription || 'Keine Kurzbeschreibung',
          Description: item.Description || 'Keine Beschreibung',
          Picture: item.Picture?.url ? `${API_URL}${item.Picture.url}` : '/placeholder.svg',
        },
      })
    );
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}
