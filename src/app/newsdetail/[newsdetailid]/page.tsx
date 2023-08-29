import Image from 'next/image';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function NewsDetail({ params }: { params: { newsdetailId: string } }) {
  const newsEntry = await prisma.NewsEntries.findUniqueOrThrow({
    where: {
      Id: parseInt(params.newsdetailId),
    },
  });
  await prisma.$disconnect();
  return (
    <div className="mt-10 w-full">
      <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative" style={{ height: 24 + 'em' }}>
        <div className="absolute left-0 bottom-0 w-full h-full z-10 rounded-xl news-item-header"></div>
        <Image
          src="/Muehlenhof.jpg"
          width={1920}
          height={1080}
          alt=""
          className="absolute left-0 top-0 w-full h-full z-0 object-cover rounded-xl"
        />
        <div className="p-4 absolute bottom-0 left-0 z-20">
          <h2 className="text-4xl font-semibold text-gray-100 leading-tight">{newsEntry.Title}</h2>
        </div>
      </div>
      <div className="mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">{newsEntry.Description}</div>
    </div>
  );
}
