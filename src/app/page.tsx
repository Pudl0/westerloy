import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/*Dashboard Header*/}
      <div className="overflow-hidden bg-no-repeat bg-cover rounded-xl dashboard-header">
        <div className="top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed dashboard-background">
          <div className="flex justify-center items-center h-full">
            <div className="text-center text-white lg:px-6 md:px-12 px-2">
              <h1 className="text-5xl font-bold mt-12 mb-12">Das passiert in Westerloy</h1>
              <h3 className="text-3xl font-bold lg:mb-24 mb-8">Auf einen Blick alle Events in und rund um das schönste Dorf des Ammerlands.</h3>
              <button
                type="button"
                className="inline-block px-6 py-2.5 border-2 border-white text-white font-medium text-md leading-tight uppercase rounded hover:bg-black hover:bg-opacity-45 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                data-mdb-ripple="true" data-mdb-ripple-color="light">
                Zu den Events
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*News Items*/}
      <div className="lg:pt-32 md:pt-24 md:pb-12 pt-12 pb-12">
    <h2 className="flex flex-row flex-nowrap items-center my-8">
        <span className="flex-none block lg:mx-4 lg:px-4 lg:py-2.5 lg:text-xl
                    mx-2 px-2 py-1.5 text-md
                    leading-none font-medium uppercase bg-black text-white">
            Neuigkeiten aus Westerloy
        </span>
    </h2>
    <div className="grid lg:grid-cols-2 sm:grid-cols-1 lg:pt-24 pt-12 mx-8 justify-items-center gap-y-32">
        {/* @foreach(var NewsEntry in NewsEntries)
        {
            <NewsDashboardItem
                       Id = "@NewsEntry.Id"
                       Title = "@NewsEntry.Title"
                       ShortDescription = "@NewsEntry.ShortDescription"
                       PictureLink = "@NewsEntry.PictureLink">
            </NewsDashboardItem>
        } */}
    </div>
</div>
    </main>
  )
}
