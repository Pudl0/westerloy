import { CalendarDays, Heart, Newspaper, RotateCcw, Star, Users2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
  description: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const standaloneNavItems: NavItem[] = [
  {
    name: 'Trauzimmer',
    href: '/trauzimmer',
    description: 'Heiraten im Mühlenhof',
  },
];

export const navGroups: NavGroup[] = [
  {
    title: 'Vereine',
    items: [
      { name: 'OBV', href: '/vereine/obv', description: 'Der Ortsbürgerverein informiert.' },
      {
        name: 'Landjugend 3.0',
        href: '/vereine/landjugend',
        description: 'Die Landjugend stellt sich vor.',
      },
      {
        name: 'Theater',
        href: '/vereine/theater',
        description: 'Unser Dorf spielt Theater',
      },
      {
        name: 'Backgruppe',
        href: '/vereine/backgruppe',
        description: 'Die Backhruppe und ihr Backspieker',
      },
    ],
  },
  {
    title: 'Dorfgeschehen',
    items: [
      {
        name: 'Neuigkeiten',
        href: '/dorfgeschehen/neuigkeiten',
        description: 'Aktuelle Neuigkeiten aus dem Dorf.',
      },
    ],
  },
  {
    title: 'Vermietung',
    items: [
      {
        name: 'Mühlenhof',
        href: '/vermietung/muehlenhof',
        description: 'Feiern im Mühlenhof',
      },
      {
        name: 'Grillhütte',
        href: '/vermietung/grillhuette',
        description: 'Grillen in der Natur',
      },
      {
        name: 'Scheune',
        href: '/vermietung/scheune',
        description: 'Feiern im unserer Scheune',
      },
    ],
  },
];
