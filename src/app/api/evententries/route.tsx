import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { title, description, timeOfEvent, location, pictureLink } = await req.json();

  await prisma.eventEntries.create({
    data: { title, description, timeOfEvent, location, pictureLink },
  });

  return NextResponse.json({ message: 'Created new EventEntry' }, { status: 200 });
}
