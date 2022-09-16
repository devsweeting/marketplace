import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { USER_TOKEN_COOKIE } from '@/helpers/constants';
import { decrypt, encrypt } from '@/helpers/crypto';
import type { NextServerRequest, NextServerResponse } from '@/types/next';
import type { IJwt } from '@/types/jwt';

export const setUserCookie = (
  token: IJwt,
  req: NextServerRequest,
  res: NextServerResponse,
  age?: number,
): void => {
  const encryptedToken = encrypt(token.accessToken);
  const encryptedRefreshToken = encrypt(token.refreshToken);
  const tokens = JSON.stringify({
    accessToken: encryptedToken,
    refreshToken: encryptedRefreshToken,
  });
  setCookie(USER_TOKEN_COOKIE, tokens, {
    req,
    res,
    httpOnly: true,
    maxAge: age ?? 60 * 60 * 24 * 365,
  });
};

export const getUserCookie = (req: NextServerRequest): IJwt | undefined => {
  const tokens = getCookie(USER_TOKEN_COOKIE, { req });

  if (typeof tokens !== 'string') {
    return;
  }
  let encryptedTokens;
  try {
    encryptedTokens = JSON.parse(tokens);
  } catch (error) {
    return;
  }

  const decryptedToken = decrypt(encryptedTokens.accessToken);
  const decryptedRefreshToken = decrypt(encryptedTokens.refreshToken);

  return {
    accessToken: decryptedToken,
    refreshToken: decryptedRefreshToken,
  };
};

export const removeUserCookie = (req: NextServerRequest, res: NextServerResponse) => {
  deleteCookie(USER_TOKEN_COOKIE, { req, res });
};
