import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export default function EventDashboardItem() {
  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden drop-shadow-lg w-3/4 xl:w-2/3">
      <Image className="h-3/4 item-header" src="/Muehlenhof.jpg" width={1920} height={1080} alt="" />
      <div className="flex flex-col w-full md:flex-row">
        <div className="flex justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-300 md:flex-col md:items-center md:justify-center md:w-1/4">
          <div className="md:text-3xl xl:text-4xl">01.</div>
          <div className="md:text-lg xl:text-xl">Dezember</div>
          <div className="md:text-lg xl:text-xl">2021</div>
        </div>
        <div className="flex flex-col gap-y-2 p-4 font-normal text-gray-800">
          <h1 className="text-xl xl:text-2xl font-bold tracking-tight text-gray-800">Heimspiel 2. Herren</h1>
          <p className="leading-normal text-ms xl:text-lg">Wird wieder n mordsmäßiges Spiel</p>
          <div className="flex flex-row items-center text-gray-700 gap-2">
            <FontAwesomeIcon icon={faLocationDot} className="fas fa-location-dot"></FontAwesomeIcon>
            <div className="text-ms xl:text-lg">LVM Arena</div>
          </div>
        </div>
      </div>
    </div>
  );
}
