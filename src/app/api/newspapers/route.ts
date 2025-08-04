import { NextResponse } from 'next/server';

import { fetchNewspapers } from '@/lib/api';

export async function GET() {
  try {
    console.log('API route: Starting newspaper fetch...');
    const newspapers = await fetchNewspapers();
    console.log(`API route: Successfully fetched ${newspapers.length} newspapers`);
    return NextResponse.json(newspapers);
  } catch (error) {
    console.error('API route error:', error);

    // Return more detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        error: 'Fehler beim Laden der Zeitungen',
        details: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
