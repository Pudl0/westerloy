import Link from 'next/link';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function BackToDashboardButton() {
  return (
    <button className="items-center rounded-lg p-1 text-sm font-medium text-black hover:bg-westerloySecondary">
      <FontAwesomeIcon icon={faArrowLeft} className="fas fa-arrow-right"></FontAwesomeIcon>
      <Link
        href={{
          pathname: '/',
        }}
        as={'/'}
      >
        Zurück zur Startseite
      </Link>
    </button>
  );
}
