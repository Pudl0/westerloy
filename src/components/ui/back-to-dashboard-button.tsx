import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function BackToDashboardButton() {
  return (
    <button className="ml-12 inline-flex items-center gap-2 self-start rounded-lg p-2 text-sm font-medium text-black hover:bg-slate-100">
      <FontAwesomeIcon icon={faArrowLeft} className="fas fa-arrow-right"></FontAwesomeIcon>
      <Link
        href={{
          pathname: '/',
        }}
        as={'/'}
      >
        Zurück zum Dashboard
      </Link>
    </button>
  );
}
