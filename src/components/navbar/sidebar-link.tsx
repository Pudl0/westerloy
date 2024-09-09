import Link from 'next/link';
import React from 'react';

import { SidebarLinkContent } from '@/components/navbar/types';
import { SheetClose } from '@/components/ui/sheet';

export const SidebarLink: React.FC<SidebarLinkContent> = ({ name, href, icon: Icon }) => {
  return (
    <SheetClose asChild>
      <Link
        href={href}
        className="flex items-center justify-between px-3 py-2 transition-colors hover:rounded-lg hover:bg-accent hover:text-accent-foreground"
      >
        <span>{name}</span>
        <Icon className="h-5 w-5" />
      </Link>
    </SheetClose>
  );
};
