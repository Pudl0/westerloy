import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LoginButton from '@/components/ui/loginbutton';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <div className="w-full flex-col gap-x-5 p-12">
        <div className="flex-row">
          <p>Signed in as {session?.user?.name}</p>
          <p> Mail: {session?.user?.email}</p>
        </div>
        <div className="flex gap-x-32 p-16">
          <Link
            href={{
              pathname: '/editor/news',
            }}
            as={`/editor/news`}
          >
            Nachrichtenbeitrag hinzufügen
          </Link>
          <Link
            href={{
              pathname: '/editor/veranstaltungen',
            }}
            as={`/editor/veranstaltungen`}
          >
            Veranstaltung hinzufügen
          </Link>
          <Link
            href={{
              pathname: '/editor/dorfzeitung',
            }}
            as={`/editor/dorfzeitung`}
          >
            Dorfzeitung hinzufügen
          </Link>
          <Link
            href={{
              pathname: '/editor/recap',
            }}
            as={`/editor/recap`}
          >
            Rückblick hinzufügen
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p>Sie sind nicht autorisiert, bitte loggen sie sich ein!</p>
      <LoginButton />
    </div>
  );
}
