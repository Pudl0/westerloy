'use client';

import Image from 'next/image';
import { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FlyoutMenuContent } from '../lib/types/flyout-menu-types';
import muehlenhofIconImage from 'public/Muehlenhof_Icon.png';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';

const flyoutMenuContentMuehlenhof: FlyoutMenuContent = {
  title: 'Der Mühlenhof',
  items: [
    { name: 'Trauungen', description: 'Das Trauzimmer im Mühlenhof.', href: '#' },
    {
      name: 'Den Mühlenhof mieten',
      description: 'Der ideale ort für Feiern und gemütliches Beisammen sein.',
      href: '#',
    },
  ],
};

const flyoutMenuContentClubs: FlyoutMenuContent = {
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
  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-6 px-16">
        <div className="flex lg:flex-1">
          <Image
            src={muehlenhofIconImage}
            alt="Picture of the Muehlenhof"
            width={301}
            height={183}
            className="w-32 h-20"
          />
        </div>
        <div className="hidden lg:flex lg:gap-x-12 items-center">
          <FlyoutMenu content={flyoutMenuContentMuehlenhof} />
          <FlyoutMenu content={flyoutMenuContentClubs} />
          <a href="#" className="text-base font-semibold leading-6 text-gray-900">
            Kontakt
          </a>
        </div>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger>
              <Button variant="outline" size="icon">
                <FontAwesomeIcon icon={faBars} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Title</SheetTitle>
                <SheetDescription>Description</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

function FlyoutMenu(props: { content: FlyoutMenuContent }) {
  const [btnState, setBtnState] = useState(false);

  function handleClick() {
    setBtnState((btnState) => !btnState);
  }

  return (
    <Popover className="relative">
      <Popover.Button
        className="inline-flex items-center gap-x-2 text-base font-semibold leading-6 text-gray-900"
        onClick={handleClick}
      >
        <span>{props.content.title}</span>
        <FontAwesomeIcon icon={btnState ? faChevronUp : faChevronDown} className="x-transition:enter" />
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
              {props.content.items.map((item) => (
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
