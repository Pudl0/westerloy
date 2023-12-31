import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? '',
};

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  return await NextAuth(req, res, authOptions);
};

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  return await NextAuth(req, res, authOptions);
};
