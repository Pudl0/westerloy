'use client';

import { Separator } from '@/components/ui/separator';
import { FlyoutMenuContent } from '@/lib/types/flyout-menu-types';
import { SidebarLinkContent } from '@/lib/types/sidebar-link-types';
import { faBars, faChevronDown, faHandHoldingHeart, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover, Transition } from '@headlessui/react';
import { SessionProvider, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import muehlenhofIconImage from '../../public/Muehlenhof_Icon.png';
import { Button } from '@/components/ui/button';
import LoginButton from '@/components/ui/loginbutton';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const contentClubs: FlyoutMenuContent = {
  title: 'Vereine',
  items: [
    { name: 'OBV', description: 'Der Ortsbüergerverein stellt sich vor.', href: '/vereine/obv' },
    {
      name: 'Landjugend 3.0',
      description: 'Die Landjugend stellt sich vor.',
      href: '/vereine/landjugend',
    },
    {
      name: 'Theatergruppe',
      description: 'Alle Informationen zum neuen Stück.',
      href: '/vereine/theater',
    },
  ],
};

const contentHappenings: FlyoutMenuContent = {
  title: 'Dorfgeschehen',
  items: [
    { name: 'Dorfzeitung', description: 'Alle Ausgaben der Dorfzeitung', href: '/dorfgeschehen/dorfzeitung' },
    { name: 'Rückblicke', description: 'Impressionen vergangener Veranstaltungen', href: '/dorfgeschehen/recap' },
    { name: 'Neuigkeiten', description: 'Aktuelle Neuigkeiten aus Westerloy', href: '/dorfgeschehen/neuigkeiten' },
  ],
};

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

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        document.getElementById('btnCloseSheet')?.click();
      }
    });
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <SessionProvider>
      <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-10 py-6 lg:px-16">
          <div className="flex lg:flex-1">
            <Image
              src={muehlenhofIconImage}
              alt="Picture of the Muehlenhof"
              width={301}
              height={183}
              className="h-20 w-32"
            />
          </div>
          <div className="hidden items-center gap-x-12 lg:flex">
            <FlyoutMenu title={contentClubs.title} items={contentClubs.items} />
            <FlyoutMenu title={contentHappenings.title} items={contentHappenings.items} />
            <LoggedInMenu></LoggedInMenu>
          </div>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild={true}>
                <Button variant="outline" size="icon">
                  <FontAwesomeIcon icon={faBars} />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[250px]">
                <SheetHeader>
                  <SheetTitle className="flex justify-center">Westerloy</SheetTitle>
                  <Separator />
                  <div className="flex flex-col space-y-1">
                    <SidebarLink name="OBV" href="/vereine/obv" icon={faHandHoldingHeart} />
                    <SidebarLink name="Landjugend 3.0" href="/vereine/landjugend" icon={faPeopleGroup} />
                    <SidebarLink name="Theater" href="/vereine/theater" icon={faPeopleGroup} />
                    <SidebarLink name="Dorfzeitung" href="/dorfgeschehen/dorfzeitung" icon={faPeopleGroup} />
                    <SidebarLink name="Rückblicke" href="/dorfgeschehen/recap" icon={faPeopleGroup} />
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </SessionProvider>
  );
}

function FlyoutMenu(props: FlyoutMenuContent) {
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-2 text-base font-semibold leading-6 text-gray-900">
        <span>{props.title}</span>
        <FontAwesomeIcon icon={faChevronDown} className="x-transition:enter" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {props.items.map((item) => (
                <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div>
                    <a href={item.href} className="font-semibold text-gray-900">
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

function SidebarLink(props: SidebarLinkContent) {
  return (
    <Link
      href={props.href}
      className="flex flex-row justify-end space-x-2 bg-white px-3 py-2 hover:rounded-lg hover:bg-slate-200"
    >
      <div>{props.name}</div>
      <FontAwesomeIcon icon={props.icon} className="my-auto flex w-6 flex-col" />
    </Link>
  );
}
