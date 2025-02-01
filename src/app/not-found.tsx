import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-westerloyBackground px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-westerloyAccent sm:text-5xl" aria-hidden="true">
            404
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-westerloySecondary/30 sm:pl-6">
              <h1 className="text-4xl font-extrabold tracking-tight text-westerloyPrimary sm:text-5xl">
                Seite nicht gefunden
              </h1>
              <p className="mt-1 text-base text-westerloySecondary">
                Bitte überprüfen Sie die URL in der Adressleiste und versuchen Sie es erneut.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Button asChild className="bg-westerloySecondary text-westerloyPrimary hover:bg-westerloySecondary/90">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Zurück zum Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
