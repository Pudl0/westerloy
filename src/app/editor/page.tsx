import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LoginButton from '@/components/ui/loginbutton';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <div>
        <p>Signed in as {session?.user?.name}</p>
        <p> Mail: {session?.user?.email}</p>
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
