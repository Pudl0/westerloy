import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';

export default function NotFound() {
  return (
    <div className="flex h-1/2 w-full items-center justify-center px-16 md:px-0">
      <div className="flex flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-24">
        <p className="text-6xl font-bold text-westerloySecondary md:text-7xl lg:text-9xl">404</p>
        <p className="mt-4 text-2xl font-bold text-gray-500 md:text-3xl lg:text-5xl">Seite wurde nicht gefunden.</p>
        <BackToDashboardButton />
      </div>
    </div>
  );
}
