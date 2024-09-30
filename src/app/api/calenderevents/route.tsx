import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/utils/prisma-client';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const month = searchParams.get('month');

  if (!month) {
    return NextResponse.json({ error: 'Month parameter is required' }, { status: 400 });
  }

  const monthNumber = parseInt(month, 10);

  if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
    return NextResponse.json({ error: 'Invalid month parameter' }, { status: 400 });
  }

  try {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, monthNumber - 1, 1);
    const endDate = new Date(currentYear, monthNumber, 0);

    const events = await prisma.calenderEvents.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        id: true,
        title: true,
        date: true,
        isAvailable: true,
        details: true,
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, date, details } = body;

    // Validate input
    if (!title || !date || !details) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create new CalendarEvent
    const newEvent = await prisma.calenderEvents.create({
      data: {
        title,
        date: new Date(date),
        isAvailable: false,
        details,
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
