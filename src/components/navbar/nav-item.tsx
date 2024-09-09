import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

interface SidebarLinkContent {
  name: string;
  href: string;
  icon: React.ElementType;
  description: string;
}

interface NavItemProps {
  title: string;
  items: SidebarLinkContent[];
}

export default function NavItem({ title, items }: NavItemProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-background transition-colors hover:bg-accent hover:text-accent-foreground">
        {title}
        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <Card className="w-[400px] p-4 shadow-lg lg:w-[600px]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription>
              {title === 'Vereine'
                ? 'Alles rund um die Vereine bei uns im Dorf.'
                : 'Aktuelle Neuigkeiten und unsere Dorfzeitung.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <ListItem key={item.href} {...item} />
            ))}
          </CardContent>
          <div className="mt-4 flex justify-end"></div>
        </Card>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'> & SidebarLinkContent>(
  ({ name, href, icon: Icon, description, ...props }, ref) => {
    return (
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href}
          className="block space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          {...props}
        >
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            <div className="text-sm font-medium leading-none">{name}</div>
          </div>
          <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">{description}</p>
        </Link>
      </NavigationMenuLink>
    );
  }
);
ListItem.displayName = 'ListItem';
