import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-red-500 sm:text-5xl">404</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Seite nicht gefunden</h1>
              <p className="mt-1 text-base text-gray-500">
                Bitte überprüfen Sie die URL in der Adressleiste und versuchen Sie es erneut.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <BackToDashboardButton />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
