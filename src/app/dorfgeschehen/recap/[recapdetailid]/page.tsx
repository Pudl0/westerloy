import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import Image from 'next/image';

const prisma = new PrismaClient();

export default async function RecapDetail({ params }: { params: { recapdetailid: string } }) {
  const recapentry = await prisma.recapEntries.findUniqueOrThrow({
    where: {
      id: parseInt(params.recapdetailid),
    },
  });
  await prisma.$disconnect();
  const fileNames = fs.readdirSync(recapentry.folderLink);
  return (
    <div className="mt-10 w-full">
      <BackToDashboardButton></BackToDashboardButton>
      <div className="relative mx-auto mb-4 w-full max-w-screen-md md:mb-0" style={{ height: 24 + 'em' }}>
        <div className="news-item-header absolute bottom-0 left-0 z-10 h-full w-full rounded-xl"></div>
        <Image
          src={`/uploads/recap/${recapentry.title}` + '/' + fileNames[0]}
          width={1920}
          height={1080}
          alt=""
          className="absolute left-0 top-0 z-0 h-full w-full rounded-xl object-cover"
        />
        <div className="absolute bottom-0 left-0 z-20 p-4">
          <h2 className="text-4xl font-semibold leading-tight text-gray-100">{recapentry.title}</h2>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-screen-md text-lg leading-relaxed text-gray-700">
        {recapentry.description}
      </div>
      <div className="flex h-full w-full gap-4">
        <p className="text-2xl font-semibold">Impressionen</p>
        {fileNames.map(function (fileName: string, index: number) {
          return (
            <div key={index} className="pb-3/4 relative h-full w-full">
              <Image
                key={fileName}
                src={`/uploads/recap/${recapentry.title}` + '/' + fileName}
                width={1920}
                height={1080}
                alt=""
                className="absolute left-0 top-0 z-0 h-full w-full rounded-xl object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
