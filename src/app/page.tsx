import NewsDashboardItem from '@/components/cards/news-dashboard-item';
import { NewsEntry } from '@/lib/types/news-entry';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function Home() {
  const newsEntries = await prisma.NewsEntries.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-10">
      {/*Dashboard Header*/}
      <div className="dashboard-header overflow-hidden rounded-xl bg-cover bg-no-repeat">
        <div className="dashboard-background bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
          <div className="flex h-full items-center justify-center">
            <div className="px-2 text-center text-white md:px-12 lg:px-6">
              <h1 className="mb-12 mt-12 text-5xl font-bold">Das passiert in Westerloy</h1>
              <h3 className="mb-8 text-3xl font-bold lg:mb-24">
                Auf einen Blick alle Events in und rund um das schönste Dorf des Ammerlands.
              </h3>
              <button
                type="button"
                className="text-md hover:bg-opacity-45 inline-block rounded border-2 border-white px-6 py-2.5 font-medium uppercase leading-tight text-white transition duration-150 ease-in-out hover:bg-black focus:outline-none focus:ring-0"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                <Link
                  href={{
                    pathname: 'eventdashboard',
                  }}
                  as={`eventdashboard`}
                >
                  Zu den Events
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*News Items*/}
      <div className="md:pb-12 md:pt-24">
        <h2 className="my-8 flex flex-row flex-nowrap items-center">
          <span
            className="text-md mx-2 block flex-none bg-black px-2
                    py-1.5 font-medium uppercase leading-none
                    text-white lg:mx-4 lg:px-4 lg:py-2.5 lg:text-xl"
          >
            Neuigkeiten aus Westerloy
          </span>
        </h2>
      </div>
      <div className="mx-8 grid justify-items-center gap-x-24 gap-y-32 pt-12 sm:grid-cols-1 lg:grid-cols-2 lg:pt-24">
        {newsEntries.map(function (newsentry: NewsEntry) {
          return <NewsDashboardItem newsentry={newsentry} key={newsentry.id} />;
        })}
      </div>
    </main>
  );
}
