import RecapDashboardItem from '@/components/cards/recap-dashboard-item';
import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';
import { RecapEntry } from '@/lib/types/recap-entry';
import { prisma } from '@/lib/utils/prisma-client';

export default async function Recap() {
  const recapEntries = (await prisma.recapEntries.findMany()).reverse();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-10">
      <BackToDashboardButton></BackToDashboardButton>
      <div className="md:pb-12 md:pt-24">
        <h2 className="my-8 flex flex-row flex-nowrap items-center">
          <span
            className="text-md mx-2 block flex-none bg-black px-2
              py-1.5 font-medium uppercase leading-none
              text-white lg:mx-4 lg:px-4 lg:py-2.5 lg:text-xl"
          >
            Rückblicke auf Veranstaltungen
          </span>
        </h2>
      </div>
      <div className="mx-8 grid justify-items-center gap-x-24 gap-y-32 pt-12 sm:grid-cols-1 lg:grid-cols-2 lg:pt-24">
        {recapEntries.map(function (recapentry: RecapEntry) {
          return <RecapDashboardItem recapentry={recapentry} key={recapentry.id} />;
        })}
      </div>
    </div>
  );
}
