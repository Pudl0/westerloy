import { getServerSession } from 'next-auth/next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginButton from '@/components/ui/loginbutton';
import { authOptions } from '@/lib/utils/authOptions';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Willkommen im Dashboard</CardTitle>
            <CardDescription>
              Angemeldet als {session.user?.name} ({session.user?.email})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h2 className="mb-4 text-xl font-semibold">Aktionen</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <LinkButton href="/editor/news">Nachrichtenbeitrag hinzufügen</LinkButton>
              <LinkButton href="/editor/veranstaltungen">Veranstaltung hinzufügen</LinkButton>
              <LinkButton href="/editor/dorfzeitung">Dorfzeitung hinzufügen</LinkButton>
              <LinkButton href="/editor/recap">Rückblick hinzufügen</LinkButton>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <Card>
        <CardContent className="pt-6">
          <p className="mb-4">Sie sind nicht autorisiert. Bitte loggen Sie sich ein!</p>
          <LoginButton />
        </CardContent>
      </Card>
    </div>
  );
}

function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <Button variant="outline" className="w-full justify-start">
        {children}
      </Button>
    </Link>
  );
}
