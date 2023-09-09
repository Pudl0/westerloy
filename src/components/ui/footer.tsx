import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return(
        <footer className="fixed bottom-0 w-full bg-white shadow md:flex md:items-center md:justify-between mt-12 p-1 md:p-3 flex items-center justify-between lg:flex lg:p-4 dark:bg-gray-800 border-t-2">
            <span className="text-sm text-gray-500 text-center dark:text-gray-400">
                &copy; {currentYear} <a>OBV Westerloy</a>
            </span>
            <ul className="flex flex-row lg:pr-3 items-center text-sm text-gray-500 dark:text-gray-400 pl-4">
                <li>
                    <Link className="hover:underline mr-4 md:mr-6" href='/legal/data-protection'>
                        Datenschutz
                    </Link>
                </li>
                <li>
                    <Link className="hover:underline mr-1" href='/legal/legal-notice'>
                        Impressum
                    </Link>
                </li>
            </ul>
        </footer>
    );
}