import { faBriefcase, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ContactCard(props: { name: string, title: string, phoneNumber: string, mailAddress: string }) {
  return (
<div className="w-80 rounded-lg border-2 px-4 py-2 shadow-lg">
      <p className="border-b-2 border-gray-400 text-lg font-medium text-gray-600 dark:text-gray-400  sm:text-2xl">
        {props.name}
      </p>

      <div className="mt-4 flex items-center text-gray-600 dark:text-gray-400">
        <FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon>
        <p className="text-md ml-2 font-semibold tracking-wide">{props.title}</p>
      </div>

      <div className="mt-4 flex items-center text-gray-600 dark:text-gray-400">
        <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
        <p className="text-md ml-2 font-semibold tracking-wide">{props.phoneNumber}</p>
      </div>

      <div className="mt-4 flex items-center text-gray-600 dark:text-gray-400">
        <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
        <a href={`mailto:${props.mailAddress}`} className="text-md ml-2 font-semibold tracking-wide hover:underline">
          {props.mailAddress}
        </a>
      </div>
    </div>
  );
}
