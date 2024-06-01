import Image from 'next/image';

import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';
import { prisma } from '@/lib/utils/prisma-client';

export default async function NewsDetail({ params }: { params: { newsdetailid: string } }) {
  const newsEntry = await prisma.newsEntries.findUniqueOrThrow({
    where: {
      id: parseInt(params.newsdetailid),
    },
  });
  return (
    <div className="mt-10 w-full">
      <BackToDashboardButton></BackToDashboardButton>
      <div className="relative mx-auto mb-4 w-full max-w-screen-md md:mb-0" style={{ height: 24 + 'em' }}>
        <div className="news-item-header absolute bottom-0 left-0 z-10 h-full w-full rounded-xl"></div>
        <Image
          src={newsEntry.pictureLink}
          width={1920}
          height={1080}
          alt=""
          className="absolute left-0 top-0 z-0 h-full w-full rounded-xl object-cover"
        />
        <div className="absolute bottom-0 left-0 z-20 p-4">
          <h2 className="text-4xl font-semibold leading-tight text-gray-100">{newsEntry.title}</h2>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-screen-md text-lg leading-relaxed text-gray-700">{newsEntry.description}</div>
    </div>
  );
}
