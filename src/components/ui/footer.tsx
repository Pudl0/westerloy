import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bottom-0 flex items-center justify-between border-t-2 bg-white px-2 py-1 shadow dark:bg-gray-800 md:p-3 lg:p-4 ">
      <span className="text-sm text-gray-500 dark:text-gray-400">
        &copy; {currentYear} <a>OBV Westerloy</a>
      </span>
      <ul className="flex flex-row text-sm text-gray-500 dark:text-gray-400 lg:pr-3">
        <li>
          <Link className="mr-4 hover:underline md:mr-6" href="/legal/data-protection">
            Datenschutz
          </Link>
        </li>
        <li>
          <Link className="mr-4 hover:underline md:mr-6" href="/legal/legal-notice">
            Impressum
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/legal/contact">
            Kontakt
          </Link>
        </li>
      </ul>
    </footer>
  );
}
