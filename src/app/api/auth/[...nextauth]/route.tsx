import NextAuth from 'next-auth';
import type { NextRequest } from 'next/server';

import { authOptions } from '@/lib/utils/authOptions';

interface RouteHandlerContext {
  params: { nextauth: string[] };
}

export const GET = async (req: NextRequest, res: RouteHandlerContext) => {
  return await NextAuth(req, res, authOptions);
};

export const POST = async (req: NextRequest, res: RouteHandlerContext) => {
  return await NextAuth(req, res, authOptions);
};
