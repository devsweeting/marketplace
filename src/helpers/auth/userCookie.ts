import { getCookie, removeCookies, setCookies } from 'cookies-next';
import { USER_TOKEN_COOKIE } from '@/helpers/constants';
import { decrypt, encrypt } from '@/helpers/crypto';
import type { NextServerRequest, NextServerResponse } from '@/types/next';

export const setUserCookie = (
  token: string,
  req: NextServerRequest,
  res: NextServerResponse,
): void => {
  const ecryptedToken = encrypt(token);
  setCookies(USER_TOKEN_COOKIE, ecryptedToken, {
    req,
    res,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
  });
};

export const getUserCookie = (req: NextServerRequest): string | undefined => {
  const token = getCookie(USER_TOKEN_COOKIE, { req });

  if (typeof token !== 'string') {
    return;
  }

  return decrypt(token);
};

export const removeUserCookie = (req: NextServerRequest, res: NextServerResponse) => {
  removeCookies(USER_TOKEN_COOKIE, { req, res });
};
