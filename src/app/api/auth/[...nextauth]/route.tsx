import NextAuth from 'next-auth';
import type { NextRequest } from 'next/server';

import { authOptions } from '@/lib/utils/authOptions';

interface RouteHandlerContext {
  params: Promise<{ nextauth: string[] }>;
}

export const GET = async (req: NextRequest, res: RouteHandlerContext) => {
  return await NextAuth(req, /* @next-codemod-error 'res' is passed as an argument. Any asynchronous properties of 'props' must be awaited when accessed. */
  res, authOptions);
};

export const POST = async (req: NextRequest, res: RouteHandlerContext) => {
  return await NextAuth(req, /* @next-codemod-error 'res' is passed as an argument. Any asynchronous properties of 'props' must be awaited when accessed. */
  res, authOptions);
};
