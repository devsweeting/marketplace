import jwtDecode from 'jwt-decode';
import { getCookie } from 'cookies-next';
import type { IncomingMessage } from 'http';
import type { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { TOKEN_COOKIE } from '@/helpers/constants';
import type { IUser } from '../types/user';

type Request = IncomingMessage & {
  cookies: NextApiRequestCookies;
};

export const getUserFromRequest = (req: Request): IUser | undefined => {
  const cookie = getCookie(TOKEN_COOKIE, { req });

  if (typeof cookie !== 'string') {
    return;
  }

  return getUserFromJwt(cookie);
};

export const getUserFromJwt = (jwt: string): IUser | undefined => {
  const parsedJwt = jwtDecode<{ subId: string }>(jwt);

  return { id: parsedJwt.subId };
};
