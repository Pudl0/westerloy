import Image from 'next/image'

export default function EventDashboardItem() {
    return (
        <div className="flex flex-col mb-16 w-full bg-white rounded shadow-lg sm:w-3/4 md:w-1/2 lg:w-3/5">
            <Image className="rounded-t-lg h-3/4 event-item" src="/Muehlenhof.jpg" width={1920} height={1080} alt="" />
            <div className="flex flex-col w-full md:flex-row">
                <div className="flex justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded-b md:flex-col md:items-center md:justify-center md:w-1/4">
                    <div className="md:text-6xl">01.</div>
                    <div className="md:text-3xl">Januar</div>
                    <div className="md:text-xl">2021</div>
                </div>
                <div className="p-4 font-normal text-gray-800 md:w-3/4">
                    <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">Heimspiel 2. Herren</h1>
                    <p className="leading-normal">Wird wieder n mordsmäßiges Spiel</p>
                    <div className="flex flex-row items-center mt-4 text-gray-700">
                        <div className="w-1/2 flex gap-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            LVM Arena
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}