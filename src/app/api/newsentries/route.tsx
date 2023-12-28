import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { title, description, pictureString, shortDescription } = await req.json();

  var data = pictureString.replace(/^data:image\/\w+;base64,/, '');
  var buffer = Buffer.from(data, 'base64');
  var imagePath = './public/uploads/news/'; // Update the path to the desired location relative to the public directory
  const filePath = imagePath + title + '.jpg';
  await fs.promises.writeFile(filePath, buffer);
  var savePath = '/uploads/news/' + title + '.jpg'; // Update the path to the desired location relative to the public directory
  await prisma.newsEntries.create({
    data: { title, description, pictureLink: savePath, shortDescription },
  });
  await prisma.$disconnect();
  return NextResponse.json({ message: 'Created new NewsEntry' }, { status: 200 });
}
