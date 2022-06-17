import type { IncomingMessage, ServerResponse } from 'http';
import type { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { getCookie, removeCookies, setCookies } from 'cookies-next';
import { USER_TOKEN_COOKIE } from '@/helpers/constants';
import { decrypt, encrypt } from '@/helpers/crypto';

type Request = IncomingMessage & {
  cookies: NextApiRequestCookies;
};

export const setUserCookie = (token: string, req: Request, res: ServerResponse): void => {
  const ecryptedToken = encrypt(token);
  setCookies(USER_TOKEN_COOKIE, ecryptedToken, {
    req,
    res,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
  });
};

export const getUserCookie = (req: Request): string | undefined => {
  const token = getCookie(USER_TOKEN_COOKIE, { req });

  if (typeof token !== 'string') {
    return;
  }

  return decrypt(token);
};

export const removeUserCookie = (req: Request, res: ServerResponse) => {
  removeCookies(USER_TOKEN_COOKIE, { req, res });
};
