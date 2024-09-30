import { CalendarDays, Newspaper, RotateCcw, Star, Users2 } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    title: 'Vereine',
    items: [
      { name: 'OBV', href: '/vereine/obv', icon: Users2, description: 'Der Ortsbürgerverein informiert.' },
      {
        name: 'Landjugend 3.0',
        href: '/vereine/landjugend',
        icon: Users2,
        description: 'Die Landjugend stellt sich vor.',
      },
    ],
  },
  {
    title: 'Dorfgeschehen',
    items: [
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
        name: 'Verfügbarkeit Mühlenhof',
        href: '/dorfgeschehen/muehlenhof',
        icon: CalendarDays,
        description: 'Auf einen Blick die Verfügbarkeit des Mühlenhofs prüfen.',
      },
      {
        name: 'Neuigkeiten',
        href: '/dorfgeschehen/neuigkeiten',
        icon: Star,
        description: 'Aktuelle Neuigkeiten aus dem Dorf.',
      },
    ],
  },
];
