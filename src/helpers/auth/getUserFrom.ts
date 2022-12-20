import jwtDecode from 'jwt-decode';
import type { IUser, IJwt, NextServerRequest } from '@/types';
import { getUserCookie } from '@/helpers/auth/userCookie';

export const getUserFromRequest = (req: NextServerRequest): IUser | undefined => {
  const token = getUserCookie(req);
  return getUserFromJwt(token);
};

export const getUserFromJwt = (jwt?: IJwt): IUser | undefined => {
  if (!jwt) {
    return;
  }
  const parsedJwt = jwtDecode<{ id: string; email: string; exp: number }>(jwt.accessToken);
  return {
    id: parsedJwt.id,
    email: parsedJwt.email,
    exp: parsedJwt.exp ? new Date(parsedJwt.exp * 1000) : undefined,
  };
};
