import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 bg-primary px-4 py-4 text-primary-foreground shadow md:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col items-center justify-between sm:flex-row">
        <div className="mb-4 text-sm sm:mb-0">
          &copy; {currentYear}{' '}
          <Link
            href="/"
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            OBV Westerloy
          </Link>
        </div>
        <nav aria-label="Footer Navigation">
          <ul className="flex flex-wrap justify-center space-x-4 text-sm sm:justify-end">
            <li>
              <Link
                href="/rechtliches/datenschutz"
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Datenschutz
              </Link>
            </li>
            <li>
              <Link
                href="/rechtliches/impressum"
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Impressum
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
