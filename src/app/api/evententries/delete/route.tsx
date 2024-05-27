import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { id } = await req.json();
  await prisma.eventEntries.delete({
    where: {
      id: id,
    },
  });
  await prisma.$disconnect();
  return NextResponse.json({ message: 'Deleted Entry with provided id' }, { status: 200 });
}
