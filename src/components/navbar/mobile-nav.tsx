import React from 'react';

import { SidebarLink } from '@/components/navbar/sidebar-link';
import { SidebarLinkContent } from '@/components/navbar/types';

interface MobileNavProps {
  items: SidebarLinkContent[];
}

export const MobileNav: React.FC<MobileNavProps> = ({ items }) => (
  <div className="flex flex-col space-y-1">
    {items.map((item) => (
      <SidebarLink key={item.href} {...item} />
    ))}
  </div>
);
