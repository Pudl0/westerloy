import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface MuehlenhofIconProps {
  className?: string;
}

export function MuehlenhofIcon({ className }: MuehlenhofIconProps) {
  return (
    <Link href="/" aria-label="Go to homepage" className={cn('block', className)}>
      <div className="flex items-center justify-center">
        <Image
          src="/Muehlenhof_Icon.png"
          alt="Muehlenhof Logo"
          width={301}
          height={183}
          className="h-auto w-32 max-w-full"
          priority
        />
      </div>
    </Link>
  );
}
