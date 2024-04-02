import NewsDashboardItem from '@/components/cards/news-dashboard-item';
import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';
import { NewsEntry } from '@/lib/types/news-entry';
import { PrismaClient } from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache';

const prisma = new PrismaClient();

export default async function NewsDashboard() {
  noStore();

  const newsEntries = (await prisma.newsEntries.findMany()).reverse();
  prisma.$disconnect();
  return (
    <main className="flex flex-col items-center justify-between px-10">
      <BackToDashboardButton></BackToDashboardButton>
      <div className="md:pt-24">
        <h2 className="my-8 flex flex-row flex-nowrap items-center">
          <span
            className="text-md mx-2 block flex-none bg-black px-2
            py-1.5 font-medium uppercase leading-none
            text-white lg:mx-4 lg:px-4 lg:py-2.5 lg:text-xl"
          >
            Aktuelle Neuigkeiten
          </span>
        </h2>
      </div>
      <div className="mx-8 grid justify-items-center gap-x-24 gap-y-32 sm:grid-cols-1 lg:mt-12 lg:grid-cols-2">
        {newsEntries.map(function (newsentry: NewsEntry) {
          return <NewsDashboardItem newsentry={newsentry} key={newsentry.id} />;
        })}
      </div>
    </main>
  );
}
