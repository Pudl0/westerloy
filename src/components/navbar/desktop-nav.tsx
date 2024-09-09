import React from 'react';

import { LoggedInMenu } from '@/components/navbar/logged-in-menu';
import NavItem from '@/components/navbar/nav-item';
import { dorfgeschehenItems, vereineItems } from '@/components/navbar/nav-items';
import { NavigationMenuItem } from '@/components/ui/navigation-menu';

export const DesktopNav: React.FC = () => (
  <>
    <NavItem title="Vereine" items={vereineItems} />
    <NavItem title="Dorfgeschehen" items={dorfgeschehenItems} />
    <NavigationMenuItem>
      <LoggedInMenu />
    </NavigationMenuItem>
  </>
);
