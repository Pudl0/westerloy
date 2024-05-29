import { prisma } from '@/lib/utils/prisma-client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { id } = await req.json();
  await prisma.eventEntries.delete({
    where: {
      id: parseInt(id),
    },
  });
  return NextResponse.json({ message: 'Deleted Entry with provided id' }, { status: 200 });
}
