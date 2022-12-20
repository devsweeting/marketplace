import jwtDecode from 'jwt-decode';
import type { IJwt, NextServerRequest } from '@/types';
import { getUserCookie } from '@/helpers/auth/userCookie';
import { safeParseInt } from '../safeParseInt';

/**
 * Gets the expiration time of the tokens contained in the JWT through the request.
 * @param req nextApiRequest
 * @returns Object containing expiration time for the access and refresh tokens.
 */
export const getExpFromRequest = (
  req: NextServerRequest,
): { accessExp: string | undefined; refreshExp: string | undefined } => {
  const token = getUserCookie(req);
  return getExpFromJwt(token);
};

/**
 * Gets the expiration time for the tokens contained in the JWT
 * @param jwt
 * @returns Object containing expiration time for the access and refresh tokens.
 */
export const getExpFromJwt = (
  jwt?: IJwt,
): { accessExp: string | undefined; refreshExp: string | undefined } => {
  if (!jwt) {
    return { accessExp: undefined, refreshExp: undefined };
  }
  const parsedJwtAccess = jwtDecode<{ exp: string }>(jwt.accessToken);
  const parsedJwtRefresh = jwtDecode<{ exp: string }>(jwt.refreshToken);
  return { accessExp: parsedJwtAccess.exp, refreshExp: parsedJwtRefresh.exp };
};

/**
 * Gets the expiration date for the access token from the jwt
 * @param jwt
 * @returns expiration date of the access token as a Date string.
 */
export const getAccessExpFromJwtAsDate = (jwt?: IJwt): Date => {
  const tokensExp = getExpFromJwt(jwt);
  const date = safeParseInt(tokensExp.accessExp ?? '') ?? 0;
  return new Date(date * 1000);
};

export const getRefreshExpFromJwtAsDate = (jwt?: IJwt): Date => {
  const tokensExp = getExpFromJwt(jwt);
  const date = safeParseInt(tokensExp.refreshExp ?? '') ?? 0;
  return new Date(date * 1000);
};

export const getExpFromAccessToken = (accessToken: string) => {
  return jwtDecode<{ exp: number }>(accessToken).exp;
};

export const getExpFromRefreshToken = (refreshToken: string) => {
  return jwtDecode<{ exp: number }>(refreshToken).exp;
};
