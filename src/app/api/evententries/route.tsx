import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { title, description, timeOfEvent, location, pictureString } = await req.json();

  var data = pictureString.replace(/^data:image\/\w+;base64,/, '');
  var buffer = Buffer.from(data, 'base64');
  var imagePath = './public/uploads/events/'; // Update the path to the desired location relative to the public directory
  const fileName = title + '.jpg';
  const filePath = imagePath + fileName;
  const savePath = '/uploads/events/' + fileName; // Update the path to the desired location relative to the public directory

  await fs.promises.writeFile(filePath, buffer);
  await prisma.eventEntries.create({
    data: { title, description, timeOfEvent, location, pictureLink: savePath },
  });
  await prisma.$disconnect();
  return NextResponse.json({ message: 'Created new EventEntry' }, { status: 200 });
}
