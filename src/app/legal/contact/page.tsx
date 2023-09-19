import { faBriefcase, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Contact() {
  return (
    <div className="p-5">
      <div className="flex w-full flex-col items-center">
        <p className="mb-8 mt-3 self-center text-center text-2xl tracking-tight text-gray-800 dark:text-white">
          Ihre Ansprechpartner beim OBV&nbsp;Westerloy
        </p>
        <div className="flex flex-col items-center gap-x-24 gap-y-12 lg:flex-row">
          {ContactCard('Katja Rottmann', 'Erste Vorsitzende', '04488-8609020', 'katja.rottmann@westerloy.de')}
          {ContactCard('Sven Siefken', 'Zweiter Vorsitzender', '04488-123456', 'sven.siefken@westerloy.de')}
        </div>
      </div>
    </div>
  );
}

export function ContactCard(name: string, title: string, phoneNumber: string, mailAddress: string) {
  return (
    <div className="w-80 rounded-lg border-2 px-4 py-2 shadow-lg">
      <p className="border-b-2 border-gray-400 text-lg font-medium text-gray-600 dark:text-gray-400  sm:text-2xl">
        {name}
      </p>

      <div className="mt-4 flex items-center text-gray-600 dark:text-gray-400">
        <FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon>
        <p className="text-md ml-2 font-semibold tracking-wide">{title}</p>
      </div>

      <div className="mt-4 flex items-center text-gray-600 dark:text-gray-400">
        <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
        <p className="text-md ml-2 font-semibold tracking-wide">{phoneNumber}</p>
      </div>

      <div className="mt-4 flex items-center text-gray-600 dark:text-gray-400">
        <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
        <a href={`mailto:${mailAddress}`} className="text-md ml-2 font-semibold tracking-wide hover:underline">
          {mailAddress}
        </a>
      </div>
    </div>
  );
}
