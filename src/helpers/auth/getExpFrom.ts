import jwtDecode from 'jwt-decode';
import type { NextServerRequest } from '@/types/next';
import { getUserCookie } from '@/helpers/auth/userCookie';
import type { IJwt } from '@/types/jwt';
import { safeParseInt } from '../safeParseInt';

export const getExpFromRequest = (req: NextServerRequest): string | undefined => {
  const token = getUserCookie(req);
  return getExpFromJwt(token);
};

export const getExpFromJwt = (jwt?: IJwt): string | undefined => {
  if (!jwt) {
    return;
  }
  const parsedJwt = jwtDecode<{ exp: string }>(jwt.accessToken);
  return parsedJwt.exp;
};

export const getExpFromJwtAsDate = (jwt?: IJwt): Date => {
  const date = safeParseInt(getExpFromJwt(jwt) ?? '') ?? 0;
  return new Date(date * 1000);
};

export const getExpFromAccessToken = (accessToken: string) => {
  const parsedToken = jwtDecode<{ exp: number }>(accessToken);
  return new Date(parsedToken.exp * 1000);
};
