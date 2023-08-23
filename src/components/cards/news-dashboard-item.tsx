import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function NewsDashboardItem() {
  return (
    <div className="flex flex-col lg:max-w-lg lg:max-h-lg max-h-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <Image className="rounded-t-lg h-3/4" src="/Muehlenhof.jpg" width={800} height={600} alt="" />
      <div className="px-2 py-3 flex flex-col">
        <h5 className="mb-2 pl-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Testeintrag</h5>
        <p className="mb-3 mt-2 mx-6 font-normal text-gray-700 dark:text-gray-400">
          Dies ist ein Test-Eintrag zum testen des Designs
        </p>
        <button className="inline-flex self-end items-center pr-6 py-2 text-sm font-medium text-center text-black rounded-lg gap-2">
          <p>Zum Artikel</p>
          <FontAwesomeIcon icon={faArrowRight} className="fas fa-arrow-right"></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}
