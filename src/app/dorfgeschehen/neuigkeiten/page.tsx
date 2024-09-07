import { unstable_noStore as noStore } from 'next/cache';

import NewsDashboard from '@/components/newsdashboard';
import { prisma } from '@/lib/utils/prisma-client';

export default async function NewsDashboardPage() {
  noStore();

  const newsEntries = await prisma.newsEntries.findMany();
  const reversedEntries = newsEntries.reverse();

  return <NewsDashboard initialEntries={reversedEntries} />;
}
