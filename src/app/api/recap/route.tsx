import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { NextResponse } from 'next/server';

const baseFolderPath = './public/uploads/recap';
const prismaClient = new PrismaClient();

export async function POST(req: Request) {
  const { title, shortDescription, description, pictureStrings } = await req.json();

  // Create a new folder with the title inside the base folder
  const recapFolderPath = `${baseFolderPath}/${title}`;
  fs.mkdirSync(recapFolderPath);

  // Loop through the pictureStrings and save them as files in the recap folder
  for (let i = 0; i < pictureStrings.length; i++) {
    const pictureString = pictureStrings[i].response as string;
    if (pictureString) {
      const shortenedPictureString = pictureString.replace(/^data:image\/[a-z]+;base64,/, '');
      const picturePath = `${recapFolderPath}/picture${i + 1}.jpg`;
      fs.writeFileSync(picturePath, shortenedPictureString, 'base64');
    }
  }

  await prismaClient.recapEntries.create({
    data: {
      title: title,
      shortDescription: shortDescription,
      description: description,
      folderLink: recapFolderPath,
    },
  });
  prismaClient.$disconnect();

  // Return success response
  return NextResponse.json({ success: true }, { status: 200 });
}
