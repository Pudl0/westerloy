'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import Link from 'next/link';
import * as React from 'react';

import { MuehlenhofIcon } from '@/components/muehelnhof-icon';
import LoginButton from '@/components/ui/loginbutton';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils/utils';

export default function Navbar() {
  return (
    <SessionProvider>
      <NavigationMenu>
        <NavigationMenuList>
          <MuehlenhofIcon></MuehlenhofIcon>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Vereine</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                      <div className="mb-2 mt-4 text-lg font-medium">Vereine</div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Alles rund um die Vereine bei uns im Dorf.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/vereine/obv" title="Obv">
                  Der Ortsbürgerverein informiert.
                </ListItem>
                <ListItem href="/vereine/landjugend" title="Landjugend">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/vereine/theater" title="Theater">
                  Unser plattdeutsches Theater.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Dorfgeschehen</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                      <div className="mb-2 mt-4 text-lg font-medium">Neuigkeiten</div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Aktuelle Neuigkeiten und unsere Dorfzeitung
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/dorfgeschehen/dorfzeitung" title="Dorfzeitung">
                  Das Archiv der Dorfzeitung.
                </ListItem>
                <ListItem href="/dorfgeschehen/recap" title="Rückblicke">
                  Impressionen vergangener Veranstaltngen
                </ListItem>
                <ListItem href="/dorfgeschehen/neuigkeiten" title="Neuigkeiten">
                  Aktuelle Neuigkeiten aus dem Dorf.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <LoggedInMenu></LoggedInMenu>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </SessionProvider>
  );
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);

const LoggedInMenu = () => {
  const session = useSession();
  if (session.status === 'authenticated')
    return (
      <Link
        href={{
          pathname: '/editor',
        }}
        as={'/editor'}
      >
        Editor
      </Link>
    );
  else return <LoginButton />;
};

ListItem.displayName = 'ListItem';
