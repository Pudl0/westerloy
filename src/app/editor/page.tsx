import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return <p>Signed in as {session?.user?.email}</p>;
  }

  return (
    <button
      type="button"
      className="text-md hover:bg-opacity-45 text-blach inline-block rounded border-2 border-white px-6 py-2.5 font-medium uppercase leading-tight transition duration-150 ease-in-out hover:bg-black focus:outline-none focus:ring-0"
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
    >
      <Link
        href={{
          pathname: '/api/auth/signin',
        }}
        as={`/api/auth/signin`}
      >
        Zum Google Login
      </Link>
    </button>
  );
}
