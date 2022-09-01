import jwtDecode from 'jwt-decode';
import type { NextServerRequest } from '@/types/next';
import { getUserCookie } from '@/helpers/auth/userCookie';
import type { IJwt } from '@/types/jwt';

export const getExpFromRequest = (req: NextServerRequest): string | undefined => {
  const token = getUserCookie(req);
  return getExpFromJwt(token);
};

export const getExpFromJwt = (jwt?: IJwt): string | undefined => {
  if (!jwt) {
    return;
  }
  const parsedJwt = jwtDecode<{ exp: string }>(jwt.refreshToken);
  return parsedJwt.exp;
};

export const getExpFromJwtAsDate = (jwt?: IJwt): Date => {
  const date = getExpFromJwt(jwt);
  return new Date(date ?? 0);
};
