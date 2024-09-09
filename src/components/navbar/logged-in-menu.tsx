import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

import LoginButton from '@/components/ui/loginbutton';

export const LoggedInMenu: React.FC = () => {
  const { status } = useSession();
  if (status === 'authenticated') {
    return (
      <Link href="/editor" className="text-sm font-medium">
        Editor
      </Link>
    );
  }
  return <LoginButton />;
};
