import jwtDecode from 'jwt-decode';
import type { IUser } from '@/types/user';
import type { NextServerRequest } from '@/types/next';
import { getUserCookie } from '@/helpers/auth/userCookie';
import type { IJwt } from '@/types/jwt';

export const getUserFromRequest = (req: NextServerRequest): IUser | undefined => {
  const token = getUserCookie(req);
  return getUserFromJwt(token);
};

export const getUserFromJwt = (jwt?: IJwt): IUser | undefined => {
  if (!jwt) {
    return;
  }
  const parsedJwt = jwtDecode<{ id: string; email: string }>(jwt.accessToken);

  return { id: parsedJwt.id, email: parsedJwt.email };
};
