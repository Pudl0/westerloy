import { CalendarPlus, FileText, ImagePlus, PenSquare } from 'lucide-react';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import LoginButton from '@/components/ui/loginbutton';
import { authOptions } from '@/lib/utils/authOptions';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">Willkommen im Dashboard</CardTitle>
            <CardDescription className="text-lg">
              Angemeldet als {session.user?.name} ({session.user?.email})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h2 className="mb-6 text-2xl font-semibold">Aktionen</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <ActionCard
                href="/editor/news"
                title="Nachrichtenbeitrag"
                description="Fügen Sie einen neuen Nachrichtenbeitrag hinzu"
                icon={PenSquare}
              />
              <ActionCard
                href="/editor/veranstaltungen"
                title="Veranstaltung"
                description="Erstellen Sie eine neue Veranstaltung"
                icon={CalendarPlus}
              />
              <ActionCard
                href="/editor/dorfzeitung"
                title="Dorfzeitung"
                description="Fügen Sie eine neue Ausgabe der Dorfzeitung hinzu"
                icon={FileText}
              />
              <ActionCard
                href="/editor/recap"
                title="Rückblick"
                description="Erstellen Sie einen neuen Rückblick"
                icon={ImagePlus}
              />
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">Letzte Anmeldung: {new Date().toLocaleString('de-DE')}</p>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Willkommen</CardTitle>
          <CardDescription>Bitte melden Sie sich an, um fortzufahren.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <LoginButton className="w-full" />
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-500">Bei Problemen kontaktieren Sie bitte den Administrator.</p>
        </CardFooter>
      </Card>
    </div>
  );
}

function ActionCard({
  href,
  title,
  description,
  icon: Icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <Link href={href} className="block h-full">
        <CardHeader>
          <Icon className="mb-2 h-8 w-8 text-primary" />
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{description}</p>
        </CardContent>
      </Link>
    </Card>
  );
}
