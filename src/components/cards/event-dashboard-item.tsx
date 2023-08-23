import Image from 'next/image';

export default function EventDashboardItem() {
  return (
    <div className="flex flex-col bg-white rounded drop-shadow-lg w-3/4 xl:w-2/3">
      <Image className="rounded-t-lg h-3/4 item-header" src="/Muehlenhof.jpg" width={1920} height={1080} alt="" />
      <div className="flex flex-col w-full md:flex-row">
        <div className="flex justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded-b md:flex-col md:items-center md:justify-center md:w-1/4">
          <div className="md:text-3xl xl:text-4xl">01.</div>
          <div className="md:text-lg xl:text-xl">Dezember</div>
          <div className="md:text-lg xl:text-xl">2021</div>
        </div>
        <div className="flex flex-col gap-y-2 p-4 font-normal text-gray-800">
          <h1 className="text-xl xl:text-2xl font-bold tracking-tight text-gray-800">Heimspiel 2. Herren</h1>
          <p className="leading-normal text-ms xl:text-lg">Wird wieder n mordsmäßiges Spiel</p>
          <div className="flex flex-row items-center text-gray-700 gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 xl:w-6 xl:h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <div className="text-ms xl:text-lg">LVM Arena</div>
          </div>
        </div>
      </div>
    </div>
  );
}
