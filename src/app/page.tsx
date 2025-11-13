import { Suspense } from 'react';
import Link from 'next/link';
import { Calendar, Utensils, ArrowRight } from 'lucide-react';

import BreakingNews from '@/components/breaking-news';
import DashboardDivider from '@/components/dashboard-divider';
import DashboardHeader from '@/components/dashboard-header';
import EventDashboard from '@/components/eventdashboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const breakingNews: string | any[] = [];

  return (
    <div className="min-h-screen bg-westerloyBackground">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader />

        {/* Christmas Knobeln Promotion */}
        <section className="mt-16 mb-12">
          <Link href="/knobeln">
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-westerloyPrimary to-westerloySecondary p-8 shadow-lg transition-all hover:shadow-2xl hover:scale-[1.02] cursor-pointer">
              <div className="relative z-10 flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
                <div className="flex-1">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white">
                    <Calendar className="h-4 w-4" />
                    Besonderes Event
                  </div>
                  <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
                    Weihnachtsknobeln 2025
                  </h2>
                  <p className="mb-4 text-lg text-white/90">
                    Gemütliche Knobel-Abende mit leckerem Essen im Dezember. Mehrere Termine verfügbar!
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4 text-white/90 md:justify-start">
                    <div className="flex items-center gap-2">
                      <Utensils className="h-5 w-5" />
                      <span>Für jeden Geschmack etwas dabei</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span>Verschiedene Termine</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-westerloyPrimary transition-colors group-hover:bg-white/90">
                  Mehr erfahren
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              {/* Decorative background pattern */}
              <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
              </div>
            </div>
          </Link>
        </section>

        {breakingNews.length > 0 && (
          <section className="mb-12 mt-16">
            <DashboardDivider title="Eilmeldungen" />
            <div className="mt-6">
              <Suspense fallback={<BreakingNewsSkeleton newsCount={breakingNews.length} />}>
                <BreakingNews news={breakingNews} />
              </Suspense>
            </div>
          </section>
        )}
        
        <section className={`mb-12 ${breakingNews.length === 0 ? 'mt-16' : ''}`}>
          <DashboardDivider title="Aktuelle Veranstaltungen" />
          <div className="mt-6">
            <Suspense fallback={<EventDashboardSkeleton />}>
              <EventDashboard />
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  );
}

function BreakingNewsSkeleton({ newsCount }: { newsCount: number }) {
  const gridCols = newsCount === 1 ? 'grid-cols-1' : newsCount === 2 ? 'grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3';
  const cardSize = newsCount <= 2 ? 'max-w-2xl mx-auto' : 'w-full';

  return (
    <div className={`grid gap-4 ${gridCols} ${newsCount <= 2 ? 'justify-center' : ''}`}>
      {[...Array(newsCount)].map((_, i) => (
        <Skeleton key={i} className={`h-24 ${cardSize} bg-westerloyPrimary/10`} />
      ))}
    </div>
  );
}

function EventDashboardSkeleton() {
  return (
    <div className="grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-full max-w-sm space-y-4 rounded-lg bg-westerloyPrimary p-4 shadow-md">
          <Skeleton className="h-48 w-full bg-westerloySecondary/20" />
          <Skeleton className="h-4 w-3/4 bg-westerloySecondary/20" />
          <Skeleton className="h-4 w-1/2 bg-westerloySecondary/20" />
        </div>
      ))}
    </div>
  );
}
