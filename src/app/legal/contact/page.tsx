import { faBriefcase, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Contact() {
  return (
    <div className="p-5">
      <div className="flex flex-col items-center w-full">
        <p className="mt-3 mb-8 text-2xl text-gray-800 dark:text-white tracking-tight self-center text-center">
          Ihre Ansprechpartner beim OBV&nbsp;Westerloy
        </p>
        <div className="flex flex-col lg:flex-row gap-x-24 gap-y-12 items-center">
          {ContactCard('Katja Rottmann', 'Erste Vorsitzende', '04488-8609020', 'katja.rottmann@westerloy.de')}
          {ContactCard('Sven Siefken', 'Zweiter Vorsitzender', '04488-123456', 'sven.siefken@westerloy.de')}
        </div>
      </div>
    </div>
  );
}

export function ContactCard(name: string, title: string, phoneNumber: string, mailAddress: string) {
  return (
    <div className="px-4 py-2 w-80 shadow-lg border-2 rounded-lg">
      <p className="font-medium text-gray-600 text-lg border-b-2 border-gray-400 sm:text-2xl  dark:text-gray-400">
        {name}
      </p>

      <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
        <FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon>
        <p className="ml-2 text-md tracking-wide font-semibold">{title}</p>
      </div>

      <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
        <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
        <p className="ml-2 text-md tracking-wide font-semibold">{phoneNumber}</p>
      </div>

      <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
        <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
        <a href={`mailto:${mailAddress}`} className="ml-2 text-md tracking-wide font-semibold hover:underline">
          {mailAddress}
        </a>
      </div>
    </div>
  );
}
