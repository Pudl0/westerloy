import Link from 'next/link';

export default function LoginButton() {
  return (
    <Link
      className="hover:underline"
      href={{
        pathname: '/api/auth/signin',
      }}
      as={`/api/auth/signin`}
    >
      Zum Login
    </Link>
  );
}
