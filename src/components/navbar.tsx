'use client';

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
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SidebarLinkContent } from '@/lib/types/sidebar-link-types';
import { cn } from '@/lib/utils/utils';
import {
  faBackward,
  faBars,
  faNewspaper,
  faPeopleGroup,
  faStar,
  faTheaterMasks,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Navbar() {
  return (
    <SessionProvider>
      <NavigationMenu className="max-lg:hidden">
        <NavigationMenuList>
          <MuehlenhofIcon />
          <NavigationMenuItem className="pl-24">
            <NavigationMenuTrigger>Vereine</NavigationMenuTrigger>
            <NavigationMenuContent className="right:0 absolute left-auto top-full w-auto bg-white">
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                      <div className="gap-4 text-lg font-medium">Vereine</div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Alles rund um die Vereine bei uns im Dorf.
                      </p>
                    </div>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/vereine/obv" title="OBV">
                  Der Ortsbürgerverein informiert.
                </ListItem>
                <ListItem href="/vereine/landjugend" title="Landjugend 3.0">
                  Die Landjugend stellt sich vor.
                </ListItem>
                <ListItem href="/vereine/theater" title="Theater">
                  Unser plattdeutsches Theater.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Dorfgeschehen</NavigationMenuTrigger>
            <NavigationMenuContent className="right:0 absolute left-auto top-full w-auto bg-white">
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                      <div className="gap-4 text-lg font-medium">Neuigkeiten</div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Aktuelle Neuigkeiten und unsere Dorfzeitung.
                      </p>
                    </div>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/dorfgeschehen/dorfzeitung" title="Dorfzeitung">
                  Das Archiv der Dorfzeitung.
                </ListItem>
                <ListItem href="/dorfgeschehen/recap" title="Rückblicke">
                  Impressionen vergangener Veranstaltungen.
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
      <div className="m-4 flex justify-end lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[250px]">
            <SheetHeader>
              <SheetTitle className="flex justify-center">Westerloy</SheetTitle>
              <Separator />
              <div className="flex flex-col space-y-1">
                <SidebarLink name="OBV" href="/vereine/obv" icon={faPeopleGroup} />
                <SidebarLink name="Landjugend 3.0" href="/vereine/landjugend" icon={faPeopleGroup} />
                <SidebarLink name="Theater" href="/vereine/theater" icon={faTheaterMasks} />
                <SidebarLink name="Dorfzeitung" href="/dorfgeschehen/dorfzeitung" icon={faNewspaper} />
                <SidebarLink name="Rückblicke" href="/dorfgeschehen/recap" icon={faBackward} />
                <SidebarLink name="Neuigkeiten" href="/dorfgeschehen/neuigkeiten" icon={faStar} />
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
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

function SidebarLink(props: SidebarLinkContent) {
  return (
    <SheetClose asChild>
      <Link
        href={props.href}
        className="flex flex-row justify-end space-x-2 bg-white px-3 py-2 hover:rounded-lg hover:bg-slate-200"
      >
        <div>{props.name}</div>
        <FontAwesomeIcon icon={props.icon} className="my-auto flex w-6 flex-col" />
      </Link>
    </SheetClose>
  );
}

const LoggedInMenu = () => {
  const session = useSession();
  if (session.status === 'authenticated')
    return (
      <Link
        href={{
          pathname: '/editor',
        }}
        as={'/editor'}
        className="text-sm font-medium"
      >
        Editor
      </Link>
    );
  else return <LoginButton />;
};

ListItem.displayName = 'ListItem';
