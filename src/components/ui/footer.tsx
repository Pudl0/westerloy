import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return(
        <footer className="flex items-center justify-between bottom-0 bg-white shadow border-t-2 py-1 px-2 md:p-3 lg:p-4 dark:bg-gray-800 ">
            <span className="text-sm text-gray-500 dark:text-gray-400">
                &copy; {currentYear} <a>OBV Westerloy</a>
            </span>
            <ul className="flex flex-row text-sm text-gray-500 lg:pr-3 dark:text-gray-400">
                <li>
                    <Link className="hover:underline mr-4 md:mr-6" href='/legal/data-protection'>
                        Datenschutz
                    </Link>
                </li>
                <li>
                    <Link className="hover:underline" href='/legal/legal-notice'>
                        Impressum
                    </Link>
                </li>
            </ul>
        </footer>
    );
}