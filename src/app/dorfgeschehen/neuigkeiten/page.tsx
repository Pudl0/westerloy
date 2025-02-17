import { unstable_noStore as noStore } from 'next/cache';
import { Suspense } from 'react';

import { NewsDashboard } from '@/components/newsdashboard';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchNews } from '@/lib/api';

export default async function Page() {
  noStore();
  const news = await fetchNews();

  return (
    <Suspense fallback={<NewsDashboardSkeleton />}>
      <NewsDashboard news={news} />
    </Suspense>
  );
}

function NewsDashboardSkeleton() {
  return (
    <div className="space-y-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-full space-y-2">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
