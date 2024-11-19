import fs from 'fs';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/utils/prisma-client';

export async function POST(req: Request) {
  const { title, description, timeOfEvent, location, pictureString } = await req.json();

  const data = pictureString.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(data, 'base64');
  const imagePath = './public/uploads/veranstaltungen/';
  const fileName = title + '.jpg';
  const filePath = imagePath + fileName;
  const savePath = '/uploads/veranstaltungen/' + fileName;

  await fs.promises.writeFile(filePath, buffer);
  await prisma.eventEntries.create({
    data: { title, description, timeOfEvent, location, pictureLink: savePath },
  });
  return NextResponse.json({ message: 'Created new EventEntry' }, { status: 200 });
}

export async function PATCH(req: Request) {
  const { newid, newtitle, newdescription, newlocation, newTimeOfEvent } = await req.json();
  await prisma.eventEntries.update({
    where: {
      id: parseInt(newid),
    },
    data: {
      title: newtitle,
      description: newdescription,
      location: newlocation,
      timeOfEvent: newTimeOfEvent,
    },
  });
  return NextResponse.json({ message: 'Edited provided EventEntry' }, { status: 200 });
}
