import { prisma } from '@/lib/utils/prisma-client';
import fs from 'fs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { title, description, pictureString, shortDescription } = await req.json();

  var data = pictureString.replace(/^data:image\/\w+;base64,/, '');
  var buffer = Buffer.from(data, 'base64');
  var imagePath = './public/uploads/news/'; // Update the path to the desired location relative to the public directory
  const fileName = title + '.jpg';
  const filePath = imagePath + fileName;
  const savePath = '/uploads/news/' + fileName; // Update the path to the desired location relative to the public directory

  await fs.promises.writeFile(filePath, buffer);

  await prisma.newsEntries.create({
    data: { title, description, pictureLink: savePath, shortDescription },
  });

  return NextResponse.json({ message: 'Created new NewsEntry' }, { status: 200 });
}

export async function PATCH(req: Request) {
  const { newid, newtitle, newdescription, newshortdescription } = await req.json();
  await prisma.newsEntries.update({
    where: {
      id: parseInt(newid),
    },
    data: {
      title: newtitle,
      description: newdescription,
      shortDescription: newshortdescription,
    },
  });
  return NextResponse.json({ message: 'Edited provided NewsEntry' }, { status: 200 });
}
