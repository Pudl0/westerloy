'use client';

import { Menu, Newspaper, RotateCcw, Star, Users } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { SessionProvider, useSession } from 'next-auth/react';
import Link from 'next/link';
import * as React from 'react';

import { MuehlenhofIcon } from '@/components/muehelnhof-icon';
import { Button } from '@/components/ui/button';
import LoginButton from '@/components/ui/loginbutton';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils/utils';

interface SidebarLinkContent {
  name: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

export default function Navbar() {
  return (
    <SessionProvider>
      <nav className="left-0 right-0 top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <MuehlenhofIcon />
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-x-6">
                <NavItem title="Vereine" items={vereineItems} />
                <NavItem title="Dorfgeschehen" items={dorfgeschehenItems} />
                <NavigationMenuItem>
                  <LoggedInMenu />
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="bg-gray-200 text-gray-800 hover:bg-gray-300 lg:hidden"
                  variant="secondary"
                  size="icon"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[250px] bg-white">
                <SheetHeader>
                  <SheetTitle className="mb-3 flex justify-center">Westerloy</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-1">
                  {[...vereineItems, ...dorfgeschehenItems].map((item) => (
                    <SidebarLink key={item.href} {...item} />
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </SessionProvider>
  );
}

const NavItem: React.FC<{ title: string; items: SidebarLinkContent[] }> = ({ title, items }) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger className="bg-white">{title}</NavigationMenuTrigger>
    <NavigationMenuContent className="right:0 absolute left-auto top-full mt-2 w-auto rounded-lg bg-gray-100">
      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
        <li className="row-span-3">
          <NavigationMenuLink asChild>
            <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-gray-50 to-gray-100 p-6 no-underline outline-none focus:shadow-md">
              <div className="gap-4 text-lg font-medium">{title}</div>
              <p className="text-sm leading-tight text-gray-600">
                {title === 'Vereine'
                  ? 'Alles rund um die Vereine bei uns im Dorf.'
                  : 'Aktuelle Neuigkeiten und unsere Dorfzeitung.'}
              </p>
            </div>
          </NavigationMenuLink>
        </li>
        {items.map((item) => (
          <ListItem key={item.href} href={item.href} title={item.name}>
            {item.description}
          </ListItem>
        ))}
      </ul>
    </NavigationMenuContent>
  </NavigationMenuItem>
);

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'> & { title: string }>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-gray-600">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';

const SidebarLink: React.FC<SidebarLinkContent> = ({ name, href, icon: Icon }) => {
  return (
    <SheetClose asChild>
      <Link
        href={href}
        className="flex items-center justify-between px-3 py-2 transition-colors hover:rounded-lg hover:bg-gray-100"
      >
        <span>{name}</span>
        <Icon className="h-5 w-5" />
      </Link>
    </SheetClose>
  );
};

const LoggedInMenu: React.FC = () => {
  const { status } = useSession();
  if (status === 'authenticated') {
    return (
      <Link href="/editor" className="text-sm font-medium">
        Editor
      </Link>
    );
  }
  return <LoginButton />;
};

const vereineItems: SidebarLinkContent[] = [
  { name: 'OBV', href: '/vereine/obv', icon: Users, description: 'Der Ortsbürgerverein informiert.' },
  { name: 'Landjugend 3.0', href: '/vereine/landjugend', icon: Users, description: 'Die Landjugend stellt sich vor.' },
];

const dorfgeschehenItems: SidebarLinkContent[] = [
  {
    name: 'Dorfzeitung',
    href: '/dorfgeschehen/dorfzeitung',
    icon: Newspaper,
    description: 'Das Archiv der Dorfzeitung.',
  },
  {
    name: 'Rückblicke',
    href: '/dorfgeschehen/recap',
    icon: RotateCcw,
    description: 'Impressionen vergangener Veranstaltungen.',
  },
  {
    name: 'Neuigkeiten',
    href: '/dorfgeschehen/neuigkeiten',
    icon: Star,
    description: 'Aktuelle Neuigkeiten aus dem Dorf.',
  },
];
