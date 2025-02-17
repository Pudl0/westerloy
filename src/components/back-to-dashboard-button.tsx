import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils/utils';

interface BackToDashboardButtonProps {
  className?: string;
  href?: string;
  iconClassName?: string;
  textClassName?: string;
  children?: React.ReactNode;
}

export default function BackToDashboardButton({
  className,
  href = '/',
  iconClassName,
  textClassName,
  children = 'Zurück zur Startseite',
}: BackToDashboardButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center rounded-lg p-2 text-sm font-medium text-primary transition-colors hover:bg-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        className
      )}
    >
      <ArrowLeft className={cn('mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1', iconClassName)} />
      <span className={cn('group-hover:text-primary-dark transition-colors', textClassName)}>{children}</span>
    </Link>
  );
}
