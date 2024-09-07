import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BackToDashboardButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-primary transition-colors hover:bg-primary-foreground"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Dashboard
    </Link>
  );
}
