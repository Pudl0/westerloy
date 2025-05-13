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
      {
        name: 'Theater',
        href: '/vereine/theater',
        icon: Users2,
        description: 'Unser Dorf spielt Theater',
      },
    ],
  },
  {
    title: 'Dorfgeschehen',
    items: [
      {
        name: 'Neuigkeiten',
        href: '/dorfgeschehen/neuigkeiten',
        icon: Star,
        description: 'Aktuelle Neuigkeiten aus dem Dorf.',
      },
      {
        name: 'Mühlenhof mieten',
        href: '/dorfgeschehen/vermietung',
        icon: Star,
        description: 'Feiern Sie im Mühlenhof, der Grillhütte oder der Scheune',
      },
    ],
  },
    {
    title: 'Vermietung',
    items: [
      {
        name: 'Mühlenhof',
        href: '/dorfgeschehen/vermietung/muehlenhof',
        icon: Star,
        description: 'Feiern im Mühlenhof',
      },
      {
        name: 'Grillhütte',
        href: '/dorfgeschehen/vermietung/grillhuette',
        icon: Star,
        description: 'Grillen in der Natur',
      },
            {
        name: 'Scheune',
        href: '/dorfgeschehen/vermietung/scheune',
        icon: Star,
        description: 'Feiern im unserer Scheune',
      },
    ],
  },
];
