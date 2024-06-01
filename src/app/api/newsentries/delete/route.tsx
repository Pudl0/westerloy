import { NextResponse } from 'next/server';

import { prisma } from '@/lib/utils/prisma-client';

export async function POST(req: Request) {
  const { id } = await req.json();
  await prisma.newsEntries.delete({
    where: {
      id: parseInt(id),
    },
  });
  return NextResponse.json({ message: 'Deleted Entry with provided id' }, { status: 200 });
}
