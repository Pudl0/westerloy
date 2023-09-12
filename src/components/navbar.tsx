'use client';

import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faChevronDown,
  faChurch,
  faPenToSquare,
  faPeopleGroup,
  faHandHoldingHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FlyoutMenuContent } from '../lib/types/flyout-menu-types';
import muehlenhofIconImage from 'public/Muehlenhof_Icon.png';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { SidebarLink } from '@/lib/types/sidebar-link-types';

const contentMuehlenhof: FlyoutMenuContent = {
  title: 'Mühlenhof',
  items: [
    { name: 'Trauungen', description: 'Das Trauzimmer im Mühlenhof.', href: '#' },
    {
      name: 'Den Mühlenhof mieten',
      description: 'Der ideale ort für Feiern und gemütliches Beisammen sein.',
      href: '#',
    },
  ],
};

const contentClubs: FlyoutMenuContent = {
  title: 'Vereine',
  items: [
    { name: 'OBV', description: 'Der Ortsbüergerverein stellt sich vor.', href: '#' },
    {
      name: 'Landjugend 3.0',
      description: 'Die Landjugend stellt sich vor.',
      href: '#',
    },
  ],
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
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-6 px-10 lg:px-16">
        <div className="flex lg:flex-1">
          <Image
            src={muehlenhofIconImage}
            alt="Picture of the Muehlenhof"
            width={301}
            height={183}
            className="w-32 h-20"
          />
        </div>
        <div className="hidden lg:flex gap-x-12 items-center">
          <FlyoutMenu title={contentMuehlenhof.title} items={contentMuehlenhof.items} />
          <FlyoutMenu title={contentClubs.title} items={contentClubs.items} />
          <a href="kontakt" className="text-base font-semibold leading-6 text-gray-900">
            Kontakt
          </a>
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
                  <SidebarLink name="Trauungen" href="/trauungen" icon={faChurch} />
                  <SidebarLink name="Mühlenhof mieten" href="/muehlenhof-mieten" icon={faPenToSquare} />
                  <SidebarLink name="OBV" href="/obv" icon={faHandHoldingHeart} />
                  <SidebarLink name="Landjugend 3.0" href="/landjugend" icon={faPeopleGroup} />
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
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

function SidebarLink(props: SidebarLink) {
  return (
    <Link
      href={props.href}
      className="flex flex-row justify-end space-x-2 py-2 px-3 bg-white hover:bg-slate-200 hover:rounded-lg"
    >
      <div>{props.name}</div>
      <FontAwesomeIcon icon={props.icon} className="flex flex-col w-6 my-auto" />
    </Link>
  );
}
