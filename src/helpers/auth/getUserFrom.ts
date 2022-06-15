import jwtDecode from 'jwt-decode';
import type { IncomingMessage } from 'http';
import type { NextApiRequestCookies } from 'next/dist/server/api-utils';
import type { IUser } from '../../types/user';
import { getUserCookie } from '@/helpers/auth/userCookie';

type Request = IncomingMessage & {
  cookies: NextApiRequestCookies;
};

export const getUserFromRequest = (req: Request): IUser | undefined => {
  const token = getUserCookie(req);

  return getUserFromJwt(token);
};

export const getUserFromJwt = (jwt?: string): IUser | undefined => {
  if (!jwt) {
    return;
  }

  const parsedJwt = jwtDecode<{ subId: string }>(jwt);

  return { id: parsedJwt.subId };
};
