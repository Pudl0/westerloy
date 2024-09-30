import { Calendar, Newspaper, RotateCcw, Star, Users } from 'lucide-react';

import { SidebarLinkContent } from '@/components/navbar/types';

export const vereineItems: SidebarLinkContent[] = [
  { name: 'OBV', href: '/vereine/obv', icon: Users, description: 'Der Ortsbürgerverein informiert.' },
  { name: 'Landjugend 3.0', href: '/vereine/landjugend', icon: Users, description: 'Die Landjugend stellt sich vor.' },
];

export const dorfgeschehenItems: SidebarLinkContent[] = [
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
    icon: Calendar,
    description: 'Auf einen Blick die Verfügbarkeit des Mühlenhofs prüfen.',
  },
  {
    name: 'Neuigkeiten',
    href: '/dorfgeschehen/neuigkeiten',
    icon: Star,
    description: 'Aktuelle Neuigkeiten aus dem Dorf.',
  },
];
