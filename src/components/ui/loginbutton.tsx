import Link from 'next/link';

export default function LoginButton() {
  return (
    <Link
      className="text-sm font-medium hover:underline"
      href={{
        pathname: '/api/auth/signin',
      }}
      as={`/api/auth/signin`}
    >
      Zum Login
    </Link>
  );
}
