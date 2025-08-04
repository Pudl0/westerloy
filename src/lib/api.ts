import type { EventEntry } from '@/lib/types/event-entry';
import type { NewsEntry } from '@/lib/types/news-entry';

export interface Newspaper {
  id: number;
  title: string;
  date: string;
  description: string;
  pages: number;
  size: string;
  pdfUrl: string;
}

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
          Title: item.Title ?? 'Kein Titel',
          Description: item.Description ?? 'Keine Beschreibung',
          TimeOfEvent: item.TimeOfEvent ? new Date(item.TimeOfEvent) : new Date(),
          Location: item.Location ?? 'Kein Ort angegeben',
          Picture: item.Picture?.url ? `${API_URL}${item.Picture.url}` : '/placeholder.svg',
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
        Title: item.Title || 'Kein Titel',
        ShortDescription: item.ShortDescription || 'Keine Kurzbeschreibung',
        Description: item.Description || 'Keine Beschreibung',
        Picture: item.Picture?.url ? `${API_URL}${item.Picture.url}` : '/placeholder.svg',
      })
    );
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function fetchNewspapers(): Promise<Newspaper[]> {
  try {
    const jwt = await authenticate();
    const newspapersResponse = await fetch(`${API_URL}/api/newspapers?populate=*&sort[0]=date:desc`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    if (!newspapersResponse.ok) {
      throw new Error('Failed to fetch newspapers');
    }

    const newspapersData = await newspapersResponse.json();

    if (!newspapersData.data || !Array.isArray(newspapersData.data)) {
      console.error('Unexpected API response structure for newspapers');
      return [];
    }

    const newspapers = newspapersData.data
      .map((item: any): Newspaper => {
        return {
          id: item.id ?? 0,
          title: item.title ?? 'Kein Titel',
          date: item.date ?? new Date().toISOString(),
          description: item.description ?? 'Keine Beschreibung',
          pages: item.pages ?? 1,
          size: item.size ?? 'Unbekannt',
          pdfUrl: item.pdf?.url ? `${API_URL}${item.pdf.url}` : '',
        };
      })
      .filter((newspaper: Newspaper) => newspaper.pdfUrl); // Only include newspapers with valid PDF URLs

    return newspapers;
  } catch (error) {
    console.error('Error fetching newspapers:', error);
    throw error;
  }
}
