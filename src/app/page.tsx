import EventDashboard from '@/components/eventdashboard';

export default async function Home() {
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
            </div>
          </div>
        </div>
      </div>
      <div className="md:pb-12 md:pt-24">
        <h2 className="my-8 flex flex-row flex-nowrap items-center">
          <span
            className="text-md mx-2 block flex-none bg-black px-2
                py-1.5 font-medium uppercase leading-none
                text-white lg:mx-4 lg:px-4 lg:py-2.5 lg:text-xl"
          >
            Aktuelle Veranstaltungen
          </span>
        </h2>
      </div>
      <EventDashboard />
    </main>
  );
}
