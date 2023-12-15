import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { title, description, pictureString, shortDescription } = await req.json();
  console.log(pictureString);
  await prisma.newsEntries.create({
    data: { title, description, pictureLink: '', shortDescription },
  });

  return NextResponse.json({ message: 'Created new NewsEntry' }, { status: 200 });
}
